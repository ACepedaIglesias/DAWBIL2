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

  // Referencias a botones
  const botnoInspeccionar = document.getElementById('inspeccionar');
  const botonClonar = document.getElementById('clonar');
  const copiarSims = document.getElementById('copiarSimbolos');
  const btnOpenDoor = document.getElementById('puerta');

  function appendLog(text){
    if (!log) return;
    const p = document.createElement('div');
    p.textContent = text;
    log.appendChild(p);
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
      // Intentamos usar structuredClone si está disponible; si lanza un error, usamos deepClone como fallback.
      let usedMethod = 'deepClone';
      try {
        if (typeof structuredClone === 'function') {
          cloned = structuredClone(cabinet);
          usedMethod = 'structuredClone';
        } else {
          cloned = deepClone(cabinet);
        }
      } catch (e) {
        // structuredClone puede lanzar al clonar funciones; usar fallback seguro
        cloned = deepClone(cabinet);
        usedMethod = 'deepClone';
        appendLog('Aviso: structuredClone falló, se usó deepClone como fallback.');
      }
      // Indicar método usado
      appendLog('Objeto clonado con ' + usedMethod + '.');
      // Algunas modificaciones en el clone para mostrar diferencia
      if (cloned && cloned.contents && Array.isArray(cloned.contents.notes)){
        cloned.locked = false;
        cloned.contents.notes.push('clonado');
        appendLog('En el clon: locked=' + cloned.locked + ', notes=' + cloned.contents.notes.join(','));
      }
      // activar botón de copiar símbolos
      if (copiarSims) copiarSims.disabled = false;
    });
  }

  if (copiarSims) {
    copiarSims.addEventListener('click', ()=>{
      if (!cloned) { appendLog('Primero clona el objeto.'); return; }
      // Copiar símbolos desde el original al clon
      const syms = Object.getOwnPropertySymbols(cabinet);
      for (const s of syms) {
        cloned[s] = cabinet[s];
      }
      symbolsCopied = true;
      appendLog('Símbolos copiados al clon: ' + syms.map(s => s.toString()).join(', '));
      // habilitar abrir puerta si condiciones cumplidas
      intentaAbrir();
    });
  }

  function intentaAbrir(){
    if (!btnOpenDoor) return;
    // condición: clon exists, clon openCheck true, y que symSecret esté presente
    try {
      if (cloned && typeof cloned.openCheck === 'function' && cloned.openCheck() && cloned[Symbol.for('secretCode')] === cabinet[Symbol.for('secretCode')]){
        btnOpenDoor.disabled = false;
        appendLog('Condiciones cumplidas: puedes abrir la puerta.');
      } else {
        appendLog('Aún no se cumplen las condiciones para abrir.');
      }
    } catch (e) {
      appendLog('Error comprobando condiciones para abrir: ' + e.message);
    }
  }

  if (btnOpenDoor) {
    btnOpenDoor.addEventListener('click', ()=>{
      // Al abrir, redirigir a room2.html
      window.location.href = 'room2.html';
    });
  }

  // Inicialmente no permitir copiar símbolos hasta clonar (protegemos por si faltan botones)
  if (copiarSims) copiarSims.disabled = true;
  if (btnOpenDoor) btnOpenDoor.disabled = true;

  // Pequeño tip para usuario
  appendLog('Pista: clona el objeto y copia sus símbolos para que el clon tenga el código secreto.');
});
