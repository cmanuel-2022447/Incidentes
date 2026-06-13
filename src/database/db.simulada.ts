import * as fs from 'fs';
import type { Incidente } from '../models/incidente.model';

// Ruta donde se almacenan los datos de forma persistente
const DB_PATH = './database.json';

/**
 * Lee el archivo JSON y lo convierte a un arreglo de objetos Incidente.
 * Si el archivo no existe, retorna un arreglo vacio para evitar errores.
 */
export const leerDB = (): Incidente[] => {
    if (!fs.existsSync(DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

/**
 * Convierte el arreglo de incidentes a formato JSON y lo guarda en el archivo.
 * El parametro 'null, 2' formatea el archivo para que sea legible por humanos.
 */
export const guardarDB = (data: Incidente[]) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

/**
 * Vacia la base de datos sobrescribiendo el archivo con un arreglo vacio.
 */
export const limpiarDB = (): void => {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
};
