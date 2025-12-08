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

