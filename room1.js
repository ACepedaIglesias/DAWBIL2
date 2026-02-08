// Sala 1: objeto con símbolos, funciones y objetos anidados.

// Definimos símbolos
const symId = Symbol('id');
const symSecret = Symbol.for('secretCode');

// Creamos el objeto con objetos aninados y una función
const cabinet = {
  owner: 'Andres',
  locked: true,
  contents: {
    notes: ['buscar', 'clonar', 'simbolos'],
    keyParts: {a: 1, b: 2}
  },
  openCheck() {
    // función que valida condiciones para abrir
    return !this.locked && Array.isArray(this.contents?.notes);
  },
  [symId]: 42,
  [symSecret]: 'AZ-123'
};

let cloned = null;
let symbolsCopied = false;

// Fallback de clonación que copia propiedades (incluidos Symbol) y preserva funciones
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (Array.isArray(obj)) return obj.map(deepClone);

  const out = {};
  for (const key of Reflect.ownKeys(obj)) {
    out[key] = deepClone(obj[key]);
  }
  return out;
}

document.addEventListener('DOMContentLoaded', () => {
  const salida = document.getElementById('salida');
  const log = document.getElementById('log');

  // Referencias a botones originales
  const botnoInspeccionar = document.getElementById('inspeccionar');
  const botonClonar = document.getElementById('clonar');
  const copiarSims = document.getElementById('copiarSimbolos');
  const btnOpenDoor = document.getElementById('puerta');

  function appendLog(text){
    if (!log) return;
    const p = document.createElement('div');
    p.textContent = `> ${text}`; // Agregué un > para que parezca terminal
    log.appendChild(p);
    log.scrollTop = log.scrollHeight; // Auto scroll al final
  }
  
  if (botnoInspeccionar) {
    botnoInspeccionar.addEventListener('click', ()=>{
      if (salida) salida.innerHTML = `Objeto original: ${cabinet.owner}, locked=${cabinet.locked}`;
      appendLog('Símbolos propios: ' + Object.getOwnPropertySymbols(cabinet).map(s=>s.toString()).join(', '));
      appendLog('Contenido notes: ' + cabinet.contents.notes.join(', '));
    });
  }

  if (botonClonar) {
    botonClonar.addEventListener('click', ()=>{
      let usedMethod = 'deepClone';
      try {
        if (typeof structuredClone === 'function') {
          // structuredClone fallará con métodos, así que el catch lo capturará
          cloned = structuredClone(cabinet); 
          usedMethod = 'structuredClone';
        } else {
          cloned = deepClone(cabinet);
        }
      } catch (e) {
        cloned = deepClone(cabinet);
        usedMethod = 'deepClone (fallback)';
        appendLog('Nota: structuredClone no clona métodos. Usando deepClone.');
      }
      appendLog('Objeto clonado con ' + usedMethod + '.');
      
      if (cloned && cloned.contents && Array.isArray(cloned.contents.notes)){
        cloned.locked = false;
        cloned.contents.notes.push('clonado');
        appendLog('En el clon: locked=' + cloned.locked);
      }
      if (copiarSims) copiarSims.disabled = false;
    });
  }

  if (copiarSims) {
    copiarSims.addEventListener('click', ()=>{
      if (!cloned) { appendLog('Primero clona el objeto.'); return; }
      const syms = Object.getOwnPropertySymbols(cabinet);
      for (const s of syms) {
        cloned[s] = cabinet[s];
      }
      symbolsCopied = true;
      appendLog('Símbolos copiados exitosamente.');
      intentaAbrir();
    });
  }

  function intentaAbrir(){
    if (!btnOpenDoor) return;
    try {
      // Verificamos si podemos abrir
      if (cloned && typeof cloned.openCheck === 'function' && cloned.openCheck() && cloned[Symbol.for('secretCode')] === cabinet[Symbol.for('secretCode')]){
        
        // REQUISITO: Evento Personalizado (CustomEvent)
        // Disparamos un evento propio para avisar que la puerta está lista
        const eventoDesbloqueo = new CustomEvent('puertaDesbloqueada', {
          detail: { msg: '¡El sistema de seguridad ha sido vulnerado!' }
        });
        document.dispatchEvent(eventoDesbloqueo);

      } else {
        appendLog('Aún no se cumplen las condiciones.');
      }
    } catch (e) {
      appendLog('Error: ' + e.message);
    }
  }

  // Listener para el evento personalizado creado arriba
  document.addEventListener('puertaDesbloqueada', (e) => {
    btnOpenDoor.disabled = false;
    btnOpenDoor.style.backgroundColor = '#4CAF50'; // Verde estilo éxito
    btnOpenDoor.style.color = 'white';
    appendLog(`EVENTO CUSTOM: ${e.detail.msg}`);
  });

  if (btnOpenDoor) {
    btnOpenDoor.addEventListener('click', ()=>{
      window.location.href = 'room2.html';
    });
  }

  if (copiarSims) copiarSims.disabled = true;
  if (btnOpenDoor) btnOpenDoor.disabled = true;
  appendLog('Pista: Clona -> Copia símbolos -> Introduce código manual si falla.');

  // EVENTOS DE RATÓN CON COORDENADAS Y TAMAÑO
  // Lee la posicion del raton en el contenedor y hace X dependiendo de la posicion
  const headerZone = document.getElementById('header-zone');
  const coordDisplay = document.getElementById('coords');

  if(headerZone) {
    headerZone.addEventListener('mousemove', (e) => {
      // Obtenemos coordenadas relativas al elemento (offsetX/Y)
      const x = e.offsetX;
      const y = e.offsetY;
      
      // Obtenemos ancho y alto total del elemento
      const ancho = headerZone.offsetWidth;
      const alto = headerZone.offsetHeight;

      coordDisplay.textContent = `X: ${x} / Y: ${y}`;

      // Si el ratón pasa por el 80% del ancho (zona derecha), cambia el color
      if (x > ancho * 0.8) {
        headerZone.style.borderColor = 'green';
        coordDisplay.style.color = 'green';
      } else {
        headerZone.style.borderColor = '#ccc';
        coordDisplay.style.color = '#555';
      }
    });

    headerZone.addEventListener('mouseleave', () => {
      coordDisplay.textContent = 'Fuera de rango';
    });
  }

  // VALIDACIONES ESPECIALES DE TECLADO
  // Escuchar los inputs de teclado
  const inputCodigo = document.getElementById('input-codigo');
  const msgTeclado = document.getElementById('msg-teclado');

  if(inputCodigo) {
    inputCodigo.addEventListener('keydown', (e) => {
      
      // Teclas Especiales (Con funcionalidad de tecla enter)
      if (e.key === 'Enter') {
        if(inputCodigo.value === 'ADMIN') {
           appendLog('HACKEO: Código correcto introducido por teclado.');
           // Forzamos la apertura con el evento personalizado aunque no hayamos clonado
           const eventoHack = new CustomEvent('puertaDesbloqueada', { detail: { msg: 'Hackeo por teclado exitoso.' } });
           document.dispatchEvent(eventoHack);
        } else {
           msgTeclado.textContent = 'Código incorrecto. Prueba con "ADMIN".';
        }
        return; // Salimos para no procesar más
      }

      // Solo caracteres Alfanuméricos
      // Expresión Regular simple
      // Permitimos también teclas de control como Backspace o Tab para que se utilizen en condiciones
      const esControl = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key);
      const esAlfanumerico = /^[a-zA-Z0-9]$/.test(e.key);

      if (!esAlfanumerico && !esControl) {
        e.preventDefault(); // Evita que se escriba el caracter
        msgTeclado.textContent = '¡Error! Solo se permiten letras y números.';
        
        // Borde rojo
        inputCodigo.style.borderColor = 'red';
        setTimeout(() => inputCodigo.style.borderColor = '#ccc', 500);
      } else {
        msgTeclado.textContent = ''; // Limpiar error si escribe bien
      }

      // Presionando shift enseña la "ayuda"
      if (e.shiftKey) {
        msgTeclado.textContent = 'Ayuda: El código secreto es ADMIN';
      }
    });
  }
});