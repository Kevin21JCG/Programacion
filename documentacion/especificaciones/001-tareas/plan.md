# Plan técnico
Frontend Angular 20.3 con componente standalone, FormsModule y HttpClient. API Node.js con node:http. Persistencia node:sqlite. Node 24 para el entorno reproducible. El navegador consulta /api por proxy en desarrollo; el servidor entrega el build y API juntos en modo compilado.

## Arquitectura
Vista Angular → TareaServicio HTTP → servidor Node → TareaServicio de negocio → SQLite.
Modelo tareas: id entero, titulo, descripcion, responsable, prioridad, estado, creada y actualizada.
Se separan transporte HTTP y validación/repositorio para probar el dominio sin abrir puertos.

## Contrato
GET /api/salud → 200 {estado:"ok"}
GET /api/tareas → 200 Tarea[]
GET /api/tareas/:id → 200 Tarea / 404
POST /api/tareas → 201 Tarea / 400 / 413 / 415
PUT /api/tareas/:id → 200 Tarea / 400 / 404
DELETE /api/tareas/:id → 204 / 404
POST y PUT reciben todos los campos de Formulario, nunca id ni fechas.

## Decisiones
SQLite facilita reproducir el proyecto en Windows y comprobar persistencia sin un servicio externo. Node y Angular se comunican por una API del mismo origen. No se expone en Internet porque el alcance no contiene autenticación. La concurrencia de edición es última escritura: documentar esta limitación antes de ampliar a un equipo real.

## Validación
Pruebas automatizadas de validación, CRUD, persistencia, SQL parametrizado y contrato HTTP. Compilación con strictTemplates. Humo contra el build real. Verificación manual de filtros, indicadores, teclado y diseño móvil.
