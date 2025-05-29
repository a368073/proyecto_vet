# PetCare
Este sistema fue desarrollado como proyecto final para la materia Fundamentos de Bases de Datos.

## Descripción
Es un sistema web creado para la gestión de clínicas veterinarias, sus funcionalidades permiten al usuario tener un mejor control sobre la logística de su negocio, así como optimizar el registro de datos sobre las actividades cotidianas dentro del ámbito, tales como:

- Información esencial sobre los dueños de los animales tratados (nombre, número telefónico, etc.).
- Características distintivas de las mascotas (especie, raza, edad, etc.).
- Programación de citas futuras.
- Diagnósticos de las consultas llevadas a cabo.
- Tratamientos pertinentes ligados a consultas previas.
- Información de los veterinarios contribuyentes.

Cuenta además con una interfaz gráfica agradable a la vista, que la hace intuitiva y fácil de utilizar para cualquier persona.

## Tecnologías utilizadas
- **Frontend:** JavaScript, html, CSS
- **Backend:** Node.js, Express
- **Base de datos:** Oracle Database (XE y XEPDB1 según el entorno)

## Instalación
**1. Clonar el repositorio:**
```
git clone https://github.com/a368073/proyecto_vet.git
```

**2. Instalar dependencias:**
```
npm install
```

**3. Configurar según tu entorno:**

Dentro de la ruta `proyecto_vet/server/config/database.js` en la linea 7 utilizar:
```
connectString: 'localhost:1521/xe'
```
o
```
connectString: 'localhost:1521/xepdb1'
```
Dependiendo de la configuración de la base de datos utilizada.

## Ejecución
**1. Lanzar el servidor**

Dentro de la ruta `proyecto_vet/server` utilizar el siguiente comando:
```
node server.js
```

**2. Abrir la página**

En el navegador ir a la dirección:
```
localhost:3000
```

## Estructura del proyecto
**`proyecto_vet/`**
- `client/` (código frontend)
- `sever/` (código backend)
- `package-lock.json`
- `package.json`

## Manuales
Consulta el [Manual de Usuario](ManualUsuarioPetCare.pdf) para una guía de como utilizar la interfaz.

Consulta el [Manual de Usuario](ManualTecnicoPetCare.pdf) para más información sobre cómo se desarrolló la aplicacion.

## Autores
- Rebeca Portillo Saenzpardo
- Manuel Martínez Martínez
- Pablo Gael Torres
