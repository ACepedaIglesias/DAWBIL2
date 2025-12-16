// Usa Map, Set, Array.from, spread/destructuring y varios métodos de Array

// Map con fragmentos que forman la palabra objetivo: "LIBRO"
const piezas = new Map([[1, 'LI'], [2, 'BR'], [3, 'O']]);

// Mostrar fragmentos en la pantalla en orden aleatorio
const cont = document.getElementById('fragments');
cont.innerHTML = '';

const entradas = Array.from(piezas.entries());
// mezclar (shuffle) con Fisher-Yates
for (let i = entradas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [entradas[i], entradas[j]] = [entradas[j], entradas[i]];
}
// Recorre las entradas mezcladas del Map usando destructuring para obtener clave y valor. // Para cada par [k, v] crea un <span> con la clase 'frag', pone el texto como "clave: valor" // y lo añade al contenedor cont. Así se muestran en pantalla los fragmentos en orden aleatorio.
entradas.forEach(([k, v]) => {
    const span = document.createElement('span');
    span.className = 'frag';
    span.textContent = `${k}: ${v}`;
    cont.appendChild(span);
});

// Obtiene input, botones y zona de resultado; construye `palabraObjetivo`
// concatenando los fragmentos del Map ordenados por su clave.
const input = document.getElementById('order');
const btn = document.getElementById('try');
const hintBtn = document.getElementById('hint');
const result = document.getElementById('result');

const valoresOrdenados = Array.from(piezas.entries()).sort((a, b) => a[0] - b[0]).map(e => e[1]);
const palabraObjetivo = valoresOrdenados.reduce((a, b) => a + b, '');

btn.addEventListener('click', () => {
    const txt = (input.value || '').trim();
    if (!txt) { result.style.color = 'red'; result.textContent = 'Introduce una secuencia de índices.'; return; }

    // parseo: split, map, filter -> uso de varios métodos de Array
    const indices = txt.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));

    // Array.from para obtener las claves del Map
    const claves = Array.from(piezas.keys());

    // validación: longitud y que todos los índices sean válidos
    const esValida = indices.length === claves.length && indices.every(i => claves.includes(i));
    if (!esValida) { result.style.color = 'red'; result.textContent = 'Secuencia inválida; usa cada índice exactamente una vez.'; return; }

    // map para convertir índices en fragmentos; reduce para ensamblar
    const partes = indices.map(i => piezas.get(i));
    const ensamblada = partes.reduce((a, b) => a + b, '');

    // ejemplo de find: buscamos si alguna parte tiene la letra 'B'
    const tieneB = partes.find(p => p.includes('B')) !== undefined;

    if (ensamblada === palabraObjetivo) {
        result.style.color = 'green';
        result.textContent = '¡Correcto! Puedes abrir la puerta (window.location.href a la sala 3).';
        window.location.href = 'room3.html';
    } else {
        result.style.color = 'red';
        result.textContent = `No es correcto (${ensamblada}). Reintenta. (${tieneB ? 'Hay un fragmento con B' : ''})`;
    }
});

hintBtn.addEventListener('click', () => {
    // Uso de destructuring y Set + Array.from para pistas
    const [p1, p2, p3] = valoresOrdenados; // destructuring

    // Set para letras únicas
    const letrasUnicas = new Set(Array.from(palabraObjetivo));
    const letras = Array.from(letrasUnicas).join(', ');

    // spread para mostrar combinados (ejemplo)
    const combinado = [...valoresOrdenados].join(' | ');

    result.style.color = '#333';
    result.textContent = `Pista: letras únicas = ${letras}. Ejemplo de fragmentos ordenados: ${p1}, ${p2}, ${p3}. (Fragmentos mostrados arriba)`;
});
