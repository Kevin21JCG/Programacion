# Demostración y pruebas manuales

Primero ejecuta npm run instalar, npm run demo y npm run dev en DevTask. Abre http://localhost:4200. Los cinco registros iniciales son ficticios. No atribuyas sus tareas a trabajo realizado por el compañero.

| Caso | Acción | Resultado esperado |
|---|---|---|
| Crear | Nueva tarea, título Revisar requisitos, responsable Kevin, prioridad Alta | Nueva tarjeta en Pendiente y total aumenta |
| Validar formulario | Título de 1 carácter o responsable vacío | No permite guardar |
| Validar servidor | Enviar por API un título con solo espacios | HTTP 400 y no guarda |
| Editar | Editar tarjeta, cambiar a En revisión y guardar | Tarjeta en columna En revisión |
| Persistencia | Recargar navegador, cerrar servidor, iniciar otra vez | La tarea permanece |
| Buscar | Escribir Revisar requisitos en el buscador | Solo aparecen coincidencias |
| Filtro | Elegir prioridad Alta | Solo aparecen tareas de prioridad Alta |
| Sin resultados | Buscar una palabra que no existe | Mensaje Sin coincidencias |
| Indicadores | Aplicar filtros | Los conteos superiores mantienen el total del proyecto |
| Cancelar | Abrir edición y cancelar | Los cambios no se guardan |
| Cancelar eliminación | Eliminar y luego Cancelar | La tarea permanece |
| Eliminar | Eliminar y confirmar | Desaparece la tarjeta y disminuye el total |
| Vista móvil | Reducir ancho a 390 px | Una columna y controles dentro de la pantalla |
| Teclado | Usar Tab y Enter en formulario | Campos y botones accesibles y foco visible |

## Automatización
npm test verifica cinco pruebas de negocio, persistencia y API. npm run build verifica TypeScript y plantillas Angular y crea el build. npm run humo levanta ese build con una base temporal, comprueba HTML y API y cierra el proceso.

La revisión local automatizada del navegador cubrió creación, recarga, edición de estado, búsqueda, eliminación y ausencia de desbordamiento en 390 px. No equivale a una auditoría completa de accesibilidad.

## Qué mostrar en clase
1. spec.md y el criterio RF01.
2. pruebas/sistema.test.js y el test de entrada inválida.
3. backend/servicios/TareaServicio.js y su validación.
4. Tablero Angular y CRUD con una tarea nueva.
5. Persistencia y resultados de npm test.
6. .github/workflows/calidad.yml y posteriormente una ejecución real en GitHub.
7. Un PR que haya revisado el otro integrante.

No mostrar las dependencias node_modules como código propio. Explica tus decisiones: Angular es requisito de la práctica; SQLite facilita la reproducción; la API valida y evita acceso directo desde el navegador; una revisión humana y las pruebas complementan la asistencia de IA.
