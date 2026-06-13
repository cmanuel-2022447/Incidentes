# Generate the updated README.md code block for the user to copy
readme_code = """# Sistema de Gestion de Incidentes

Aplicacion de consola (CLI) desarrollada en TypeScript para la gestion, seguimiento y actualizacion de reportes de incidentes tecnicos de forma eficiente.

## Tecnologias Utilizadas
* **TypeScript:** Lenguaje base con tipado estatico.
* **Node.js:** Entorno de ejecucion para JavaScript del lado del servidor.
* **pnpm:** Gestor de paquetes de alto rendimiento.
* **readline-sync:** Biblioteca para la captura de entradas de usuario de forma sincrona en la terminal.

## Como Funciona el Sistema
La aplicacion opera como una interfaz de consola interactiva gestionando los datos mediante un archivo JSON que actua como base de datos simulada.

1. **Ciclo de Vida del Programa:** Al ejecutar el sistema, se inicia un bucle principal que mantiene la aplicacion activa, mostrando un menu numerado al usuario hasta que este elige la opcion de salida.

2. **Interaccion con el Usuario:** Se utiliza `readline-sync` para pausar la ejecucion y capturar entradas del teclado. Esto permite validar los datos en tiempo real; si el usuario ingresa un valor incorrecto (como texto donde se espera un ID numerico), el sistema emite una advertencia y solicita el dato nuevamente, evitando cierres inesperados.

3. **Persistencia de Datos:** Cada vez que se crea un registro o se modifica un estado, el sistema escribe los cambios directamente en un archivo `database.json`. Esto garantiza que la informacion no se pierda al cerrar el programa.

4. **Validacion de Estados:** El sistema utiliza una logica estricta para asegurar que un incidente no pueda tener estados invalidos, forzando al usuario a seleccionar opciones predefinidas.

## Requisitos Previos
* **Node.js** (v18 o superior recomendado)
* **pnpm** (gestor de paquetes instalado globalmente)
* **Git** (para clonar el repositorio)

## Instalacion y Ejecucion
1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Incidentes