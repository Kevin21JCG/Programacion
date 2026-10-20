# Especificación de gestión de tareas
Autor del proyecto: Kevin Jahir Coronel Gaona. Segundo integrante: por registrar.
Estado: especificación de la versión académica 1.0. Elaborada antes de implementar esta versión.

## Problema y alcance
Una empresa pierde el seguimiento de su trabajo. DevTask permite a dos integrantes registrar tareas, asignar un responsable y controlar su avance en un tablero Kanban. Aplicación local de demostración, sin autenticación ni acceso público. No sustituye a GitHub Projects: el producto ilustra el proceso que se administrará en GitHub.

## Requisitos y criterios de aceptación
- RF01 Crear una tarea con título (3–100 caracteres sin espacios extremos), descripción (0–1000), responsable (1–80), prioridad Baja/Media/Alta y estado Pendiente/En curso/En revisión/Completada. El servidor rechaza datos inválidos con HTTP 400 sin guardar cambios.
- RF02 Listar, buscar por título/responsable y filtrar por prioridad en el tablero. Una búsqueda vacía muestra todas las tareas. Una búsqueda sin resultados muestra una indicación clara.
- RF03 Editar los campos y cambiar el estado. Un ID inexistente responde 404. Todo cambio se conserva al recargar.
- RF04 Eliminar una tarea con confirmación. Cancelar no modifica datos. Una tarea eliminada desaparece del tablero y la base.
- RF05 Persistir datos en SQLite. Cerrar y abrir el proceso conserva las tareas. Las consultas utilizan parámetros.
- RF06 Mostrar conteos por estado y total usando los registros cargados. Los indicadores representan todas las tareas, aunque el tablero esté filtrado.
- RNF01 Angular y TypeScript en el frontend; API HTTP en Node.js; BD SQLite.
- RNF02 Validar en servidor además del formulario. Limitar cuerpo JSON a 16 KiB. Mostrar mensajes de error sin detalles internos.
- RNF03 Permitir uso por teclado, etiquetas de formulario, mensajes anunciados y diseño adaptable.
- RNF04 Pipeline que instale con npm ci, ejecute pruebas, compile Angular y produzca artefacto. Despliegue de prueba efímero en CI con prueba HTTP. Despliegue persistente separado y manual.

## Historias verificables
US01 Como integrante quiero crear una tarea para acordar el trabajo. Dado un título válido y responsable, al guardar obtengo 201 y un ID; al consultar aparece en Pendiente.
US02 Como revisor quiero cambiar estado para reflejar avance. Dada una tarea existente, al editar a En revisión aparece en esa columna tras recargar.
US03 Como coordinador quiero buscar y consultar indicadores. Dadas varias tareas, al filtrar por prioridad veo solo las coincidentes y los indicadores conservan el total general.
US04 Como integrante quiero retirar una tarea equivocada. Al confirmar eliminar se devuelve 204 y una consulta individual devuelve 404.

## Fuera de alcance
Login, permisos multiusuario, correos, archivos adjuntos y un servicio público de producción. Los responsables son nombres de demostración. El acceso de red se limita a localhost por defecto.
