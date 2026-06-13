/**
 * Definicion de tipos restringidos (Union Types).
 */
export type Prioridad = 'baja' | 'media' | 'alta';
export type EstadoIncidente = 'abierto' | 'en progreso' | 'resuelto';

/**
 * Interfaz Incidente: Representa la estructura de datos central del sistema.
 */
export interface Incidente {
    readonly id: number;           // readonly: El ID no debe cambiar una vez creado
    titulo: string;                // Titulo o asunto del reporte
    descripcion: string;           // Detalle técnico del problema
    reportadoPor: string;          // Nombre del usuario que genera el reporte
    prioridad: Prioridad;          // Tipo definido: solo 'baja', 'media' o 'alta'
    estado: EstadoIncidente;       // Tipo definido: solo 'abierto', 'en progreso' o 'resuelto'
    fechaCreacion: Date;           // Objeto Date para el registro temporal
}
