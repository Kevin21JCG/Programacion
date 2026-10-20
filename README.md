# DevTask
Proyecto de primer parcial de Programación Móvil. Autor: Kevin Jahir Coronel Gaona, UTMACH. Segundo integrante pendiente de registrar.

Aplicación real en Angular con API Node.js y SQLite. Tablero Kanban con crear, listar, buscar, filtrar, editar y eliminar tareas; responsable, prioridad y cuatro estados; indicadores globales y datos persistentes. Diseño sobrio en marfil y verde. No utiliza Vite.

## Inicio en Windows o Linux
Instala Node.js 24 LTS y abre esta carpeta DevTask en VS Code.
```
npm run instalar
npm run demo
npm run dev
```
Abre http://localhost:4200. Una terminal inicia ambos procesos (API 3000 y Angular 4200). Mantén la terminal abierta. `demo` agrega cinco tareas ficticias solamente si la base está vacía. La carpeta node_modules se genera al instalar y no viene en el ZIP.

## Verificar
```
npm test
npm run build
npm run humo
```
Modo compilado: detén `npm run dev` con Ctrl+C, ejecuta `npm start` y abre http://localhost:3000. Si el puerto está ocupado, cierra la terminal anterior. SQLite se crea automáticamente en backend/datos/devtask.db; no necesitas instalar un servidor de BD. No borres ese archivo si quieres conservar tus registros.

## Estructura
- frontend/src/app/entidades: tipos de tarea.
- frontend/src/app/servicios: cliente HTTP.
- frontend/src/app/vistas: componente y formulario Angular.
- backend/servicios: validación y repositorio SQLite.
- backend/servidor.js: rutas HTTP y entrega del build.
- pruebas: suite de negocio, persistencia y API.
- documentacion/especificaciones: spec, plan y tareas SDD.
- .github/workflows: CI y despliegue.
- documentacion: guías de equipo, GitHub, SDD, Copilot y despliegue.

## Qué está listo y qué requiere tu cuenta
Código, pruebas, especificaciones y workflows están preparados. Repositorio: https://github.com/Kevin21JCG/Programacion. Código en feat/gestion-tareas y PR #2 abierto. GitHub Actions completó correctamente la ejecución 39438736198. La revisión del compañero y las demostraciones de Copilot/Spec Kit siguen pendientes. Consulta documentacion/FLUJO_GITHUB.md. Los archivos no sustituyen esa evidencia.

## Alcance
Demostración local sin login ni permisos. No uses datos privados ni publiques la API sin agregar autenticación y controles de acceso. SQLite permite reproducir la práctica; una empresa con mucha concurrencia necesitaría evaluar otra arquitectura.
