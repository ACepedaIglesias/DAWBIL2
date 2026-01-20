import { Terminal } from './Terminal.js';
// ^^^^ Herencia desde terminal
const miTerminal = new Terminal("Puerta Servidor Central");

const btnValidar = document.getElementById('btnValidar');
const btnPista = document.getElementById('btnPista');
const inputCodigo = document.getElementById('inputCodigo');
const divMensaje = document.getElementById('mensaje');

infoSala.innerText = `Sistema: ${miTerminal.nombre} | ESTADO: BLOQUEO INMINENTE`;



// Escuchamos el primer click o tecla para arrancar
document.addEventListener('click', iniciarJuego);
document.addEventListener('keydown', iniciarJuego);

// Logica

btnValidar.addEventListener('click', () => {
    const valor = inputCodigo.value;
    const respuesta = miTerminal.validarAcceso(valor);

    divMensaje.innerText = respuesta.mensaje;

    if (respuesta.exito) {

        inputCodigo.disabled = true;
        btnValidar.disabled = true;
        btnPista.disabled = true;

        setTimeout(() => {
            alert("¡ENHORABUENA! HAS ESCAPADO.");
            location.reload(); 
        }, 1000);
    } else {
        divMensaje.style.color = "red";
    }
});

btnPista.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita conflicto con el click de inicio
    iniciarJuego(); // Por si acaso le dan a pista primero
    const pista = Terminal.obtenerAyuda();
    alert(pista);
});

inputCodigo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnValidar.click();
});