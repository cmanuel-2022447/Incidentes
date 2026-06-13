import type { Prioridad } from '../models/incidente.model';

/**
 * Data Transfer Object (DTO) para la creacion de incidentes.
 * Define la estructura exacta de los datos que el usuario debe enviar 
 * al sistema para registrar un nuevo reporte.
 */
export interface CrearIncidenteDTO {
    maquinaId: string;      // Identificador unico del equipo afectado
    titulo: string;         // Asunto breve del reporte
    descripcion: string;    // Detalle completo del incidente
    reportadoPor: string;   // Nombre de quien registra el reporte
    prioridad: Prioridad;   // Nivel de urgencia basado en el tipo definido
}
