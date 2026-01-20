import { Mecanismo } from './Mecanismo.js';
// ^^^^ Herencia/Exporte de clase a traves de mecanismo vvvv
export class Terminal extends Mecanismo {
    #password;
    #intentos;
    #tiempoRestante; // Segundos restantes
    #intervaloId;    // ID del setInterval para poder pararlo
    #audioPlayer;   // Sonido
    #audioPlayer2;   // Sonido

    static nivelSeguridad = "CRÍTICO";

    constructor(nombre) {
        super(nombre);
        this.#password = "EcmaScript"; 
        this.#intentos = 0;
        this.#tiempoRestante = 120; // 2 minutos = 120 segundos
        this.#intervaloId = null;
        // Asignacion de sonidos para la cuenta atras, por que no
        this.#audioPlayer = new Audio('./wartimer.mp3'); 
        this.#audioPlayer2 = new Audio('./quedan60segundos.mp3'); 
        
        // Carga el archivo en memoria para que suene instantáneamente
        this.#audioPlayer.preload = 'auto';
        this.#audioPlayer2.preload = 'auto';
        
    }
    // Pista pop-up
    static obtenerAyuda() {
        return `CONSEJO DEL SISTEMA: La clave es el nombre del estándar oficial de JavaScript (CamelCase).`;
    }

    // Lógica del Temporizador
    iniciarAutodestruccion(callbackActualizarReloj, callbackFinJuego) {
        // Ejecutamos inmediatamente para no esperar 1 segundo al primer beep
        this.#procesarSegundo(callbackActualizarReloj, callbackFinJuego);

        this.#intervaloId = setInterval(() => {
            this.#procesarSegundo(callbackActualizarReloj, callbackFinJuego);
        }, 1000);
    }
    // Detencion del temporizador
    detenerTemporizador() {
        if (this.#intervaloId) {
            clearInterval(this.#intervaloId);
            this.#intervaloId = null;
        }
    }

    // Método privado auxiliar para gestionar cada tick del reloj
    #procesarSegundo(callbackReloj, callbackFin) {
        if (this.#tiempoRestante > 0) {
            this.#reproducirSonidoMp3(); // Sonido
            this.#tiempoRestante--;
            
            // Convertimos segundos a formato MM:SS para la vista
            const minutos = Math.floor(this.#tiempoRestante / 60);
            const segundos = this.#tiempoRestante % 60;
            const textoTiempo = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
            
            callbackReloj(textoTiempo, this.#tiempoRestante);
            //Ejecutar el sonido de poco tiempo a los 30 segundos
            if(this.#tiempoRestante < 31 && this.#tiempoRestante > 25)
            {
                this.#audioPlayer2.play();
            }
        } else {
            this.detenerTemporizador();
            callbackFin();
        }
    }

    // Generador de Sonido
    #reproducirSonidoMp3() {
        // Asegurarse que el sonido se emite cada segundo
        this.#audioPlayer.currentTime = 0;
        
        // Te queda poco tiempo (se ejecuta cuando quedan menos de 31 segundos)
        if (this.#tiempoRestante < 31) {
            this.#audioPlayer.playbackRate = 1.25; // 25% más rápido
        } else {
            this.#audioPlayer.playbackRate = 1.0; // Velocidad normal
        }

        // ¿Podra el sonido reproducirse?
        this.#audioPlayer.play().catch(error => {
            console.warn("El navegador bloqueó el audio automático:", error);
        });
    }
    // Contador de intentos + logica para el desbloqueo y detencion de la cuenta atras
    validarAcceso(inputUsuario) {
        this.#intentos++;
        if (inputUsuario === this.#password) {
            super.desbloquear();
            this.detenerTemporizador(); // IMPORTANTE: Parar el reloj si gana
            return { exito: true, mensaje: "Acceso concedido. Secuencia abortada." };
        } else {
            return { exito: false, mensaje: `Error. Intento #${this.#intentos}.` };
        }
    }
}