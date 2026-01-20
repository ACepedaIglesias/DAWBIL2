// Clase mecanismo
export class Mecanismo {
    constructor(nombre) {
        this.nombre = nombre;
        this.activado = false;
    }

    // Método común para desbloquear
    desbloquear() {
        this.activado = true;
        return `El mecanismo [${this.nombre}] ha sido desbloqueado.`;
    }

    // Método para obtener el estado actual
    getEstado() {
        return this.activado ? "ABIERTO" : "BLOQUEADO";
    }
}