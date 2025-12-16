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
