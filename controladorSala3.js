import { Terminal } from './Terminal.js';
// ^^^^ Herencia desde terminal
const miTerminal = new Terminal("Puerta Servidor Central");

const btnValidar = document.getElementById('btnValidar');
const btnPista = document.getElementById('btnPista');
const inputCodigo = document.getElementById('inputCodigo');
const divMensaje = document.getElementById('mensaje');
const divTimer = document.getElementById('timer');
const infoSala = document.getElementById('info-sala');

infoSala.innerText = `Sistema: ${miTerminal.nombre} | ESTADO: BLOQUEO INMINENTE`;

// Definimos qué pasa cada segundo
const alHacerTick = (textoTiempo, segundosRestantes) => {
    divTimer.innerText = textoTiempo;
    
    // Si queda menos de 30 segundos, ponemos el texto en rojo parpadeante
    if (segundosRestantes < 31) {
        divTimer.classList.add("alerta");
    }
};

// Definimos qué pasa cuando el tiempo se acaba
const alTerminarTiempo = () => {
    divTimer.innerText = "00:00";
    divMensaje.innerText = "TIEMPO AGOTADO. SISTEMA BLOQUEADO PERMANENTEMENTE.";
    divMensaje.style.color = "red";
    inputCodigo.disabled = true;
    btnValidar.disabled = true;
    btnPista.disabled = true;
    document.body.style.backgroundColor = "#300"; // Fondo rojo oscuro
};

// Iniciar el juego en el momento que se hace focus a la pestaña
let juegoIniciado = false;

function iniciarJuego() {
    if (!juegoIniciado) {
        juegoIniciado = true;
        // El click hace empezar la cuenta atras
        miTerminal.iniciarAutodestruccion(alHacerTick, alTerminarTiempo);
    }
}

// Escuchamos el primer click o tecla para arrancar
document.addEventListener('click', iniciarJuego);
document.addEventListener('keydown', iniciarJuego);

// Logica

btnValidar.addEventListener('click', () => {
    const valor = inputCodigo.value;
    const respuesta = miTerminal.validarAcceso(valor);

    divMensaje.innerText = respuesta.mensaje;

    if (respuesta.exito) {
        divMensaje.style.color = "#0f0";
        divTimer.style.borderColor = "#0f0";
        divTimer.style.color = "#0f0";
        divTimer.classList.remove("alerta");
        
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