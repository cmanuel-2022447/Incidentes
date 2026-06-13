import * as readline from 'readline-sync';
import { leerDB, guardarDB, limpiarDB } from './database/db.simulada';
import type { Incidente } from './models/incidente.model';

/**
 * Funcion auxiliar para asegurar que el usuario ingrese datos obligatorios.
 * Evita strings vacios o solo con espacios.
 */
function leerTextoValidado(pregunta: string): string {
    let entrada = "";
    while (entrada.trim() === "") {
        entrada = readline.question(pregunta);
        if (entrada.trim() === "") {
            console.log("Advertencia: Este campo no puede estar vacio.");
        }
    }
    return entrada;
}

/**
 * Nucleo del programa: mantiene la aplicacion corriendo en un bucle infinito
 * hasta que el usuario elige la opcion de salir.
 */
function menuPrincipal(): void {
    while (true) {
        console.log("\n=== SISTEMA DE TALLER ===");
        console.log("[1] Salir");
        console.log("[2] Crear registro");
        console.log("[3] Listar registros");
        console.log("[4] Actualizar estado");
        
        // Limita la entrada del usuario solo a los numeros del 1 al 4
        const tecla = readline.keyIn("Selecciona una opcion [1-4]: ", {limit: '1234'});
        const db = leerDB(); // Carga la base de datos fresca en cada iteracion

        switch (tecla) {
            case '1':
                limpiarDB();
                console.log("Sistema cerrado. Base de datos vaciada.");
                process.exit(0); // Termina la ejecucion del proceso
            case '2':
                crearReporte(db);
                break;
            case '3':
                mostrarReportes(db);
                break;
            case '4':
                actualizarEstado(db);
                break;
        }
    }
}

/**
 * Recorre la base de datos y muestra los detalles de cada incidente.
 * Incluye validacion para cuando no existen registros.
 */
function mostrarReportes(db: Incidente[]): void {
    if (db.length === 0) return console.log("Advertencia: No hay registros para mostrar.");
    
    console.log("\nLISTADO DE TODOS LOS REPORTES:");
    console.log("=================================");
    
    db.forEach((rep) => {
        console.log("-------- REPORTE " + rep.id + " --------");
        console.log("ID: " + rep.id);
        console.log("Titulo: " + rep.titulo);
        console.log("Descripcion: " + rep.descripcion);
        console.log("Reportado por: " + rep.reportadoPor);
        console.log("Prioridad: " + rep.prioridad);
        console.log("Estado: " + rep.estado.toUpperCase());
        console.log("---------------------------------\n");
    });
}

/**
 * Crea un nuevo objeto Incidente y lo persiste en la base de datos.
 */
function crearReporte(db: Incidente[]): void {
    console.log("\n--- GENERAR NUEVO REPORTE ---");
    const titulo = leerTextoValidado("Titulo: ");
    const descripcion = leerTextoValidado("Descripcion: ");
    const nombre = leerTextoValidado("Nombre: ");
    
    console.log("\nPrioridad:");
    console.log("[1] Baja");
    console.log("[2] Media");
    console.log("[3] Alta");
    
    const tecla = readline.keyIn("Selecciona una opcion [1-3]: ", {limit: '123'});
    const prioridades = ['baja', 'media', 'alta'];
    const pIdx = parseInt(tecla) - 1;

    // Crea el objeto con los datos capturados y estado inicial 'abierto'
    const nuevo: Incidente = {
        id: db.length + 1,
        titulo,
        descripcion,
        reportadoPor: nombre,
        prioridad: prioridades[pIdx] as any,
        estado: 'abierto',
        fechaCreacion: new Date()
    };
    
    db.push(nuevo);
    guardarDB(db); // Persiste el nuevo registro
    console.log("\nRegistro guardado con ID: " + nuevo.id);
}

/**
 * Permite buscar un reporte por ID y modificar su estado.
 * Incluye manejo de errores para IDs inexistentes o entradas invalidas.
 */
function actualizarEstado(db: Incidente[]): void {
    if (db.length === 0) return console.log("Advertencia: No hay registros.");
    
    let reporte: Incidente | undefined;
    
    // Bucle de busqueda: fuerza al usuario a ingresar un ID valido o salir
    while (!reporte) {
        const input = readline.question("Ingresa el ID numerico del reporte (o escribe '0' para volver al menu): ");
        
        if (input === '0') return; // Punto de retorno seguro

        const id = parseInt(input);
        
        if (isNaN(id)) {
            console.log("Advertencia: Debes ingresar un numero valido.");
            continue; 
        }

        reporte = db.find(r => r.id === id);
        
        if (!reporte) {
            console.log("Advertencia: ID no encontrado. Verifica el ID en la opcion [3] Listar registros.");
        }
    }

    console.log("\nEstado actual: " + reporte.estado.toUpperCase());
    console.log("Selecciona nuevo estado:");
    console.log("[1] Abierto");
    console.log("[2] En progreso");
    console.log("[3] Resuelto");

    const tecla = readline.keyIn("Selecciona una opcion [1-3]: ", {limit: '123'});
    const estados = ['abierto', 'en progreso', 'resuelto'];
    
    reporte.estado = estados[parseInt(tecla) - 1] as any;
    guardarDB(db); // Actualiza la persistencia
    console.log("\nEstado actualizado a: " + reporte.estado.toUpperCase());
}

// Punto de entrada del programa
menuPrincipal();
