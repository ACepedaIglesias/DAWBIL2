import { Mecanismo } from './Mecanismo.js';
// ^^^^ Herencia/Exporte de clase a traves de mecanismo vvvv
export class Terminal extends Mecanismo {
    #password;
    #intentos;
    static nivelSeguridad = "CRÍTICO";

    constructor(nombre) {
        super(nombre);
        this.#password = "EcmaScript"; 
        this.#intentos = 0;
    }
    // Pista pop-up
    static obtenerAyuda() {
        return `CONSEJO DEL SISTEMA: La clave es el nombre del estándar oficial de JavaScript (CamelCase).`;
    }
    // Contador de intentos + logica para el desbloqueo 
    validarAcceso(inputUsuario) {
        this.#intentos++;
        if (inputUsuario === this.#password) {
            super.desbloquear();
            return { exito: true, mensaje: "Acceso concedido. Secuencia abortada." };
        } else {
            return { exito: false, mensaje: `Error. Intento #${this.#intentos}.` };
        }
    }
}