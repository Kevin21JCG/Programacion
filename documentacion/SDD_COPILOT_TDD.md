# SDD, Spec Kit, Copilot y TDD en la demostración

## SDD preparado
Los archivos spec.md, plan.md y tasks.md están en documentacion/especificaciones/001-tareas. La constitución está en .specify/memory/constitution.md. Se elaboraron manualmente para esta entrega; no son evidencia de ejecución de Spec Kit ni Copilot.

## Ejecución real de GitHub Spec Kit
Consulta https://github.com/github/spec-kit y su quickstart porque los comandos dependen del agente y la versión. Instala la CLI Specify siguiendo el README oficial (`uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`). En una copia del proyecto ejecuta `specify init --here --ai copilot`. No sobrescribas archivos personalizados sin revisar el diff. Registra versión de Specify y del agente.
Usa las operaciones constitution, specify, plan, tasks e implement con los comandos que la integración instalada exponga. En integraciones con comandos slash son habituales `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks` y `/speckit.implement`; otras usan `/speckit-*`. Revisa la ayuda de tu instalación antes de copiarlos.
Prompt para especificar: "Aplicación local para dos estudiantes que permita crear, listar, editar y eliminar tareas. Cada tarea tiene título, descripción, responsable, prioridad y estado. Definir criterios medibles y casos inválidos antes de programar. Fuera de alcance login y publicación pública."
Prompt para planificar: "Usa Angular 20.3, API Node.js 24 y SQLite. Mantén carpetas en español y pruebas con node:test. Documenta los endpoints y los límites de los campos."
Guarda capturas reales de la operación, los archivos generados y la revisión del diff. No es necesario regenerar toda la aplicación: puede aplicarse a una mejora pequeña acordada por el equipo.

## Copilot
Abre el proyecto con GitHub Copilot habilitado en VS Code y tu cuenta autorizada. Utiliza .github/copilot-instructions.md como contexto.
Prompt de revisión: "Revisa RF01 en spec.md y validar en TareaServicio.js. Señala una entrada que incumpla el contrato y escribe una prueba que la detecte. No cambies código todavía. Explica por qué importa."
Prompt de mejora: "Implementa únicamente el caso aprobado por el equipo. Mantén consultas parametrizadas. Presenta el diff y los comandos de validación. No afirmes resultados que no hayas ejecutado."
Registra en una bitácora fecha, prompt exacto, sugerencia, decisión humana, cambios y prueba. No subas secretos ni información real de clientes. El código de este paquete se preparó con asistencia de ChatGPT; no se atribuye a Copilot.

## TDD
Se escribió primero la especificación y la suite; la primera ejecución falló porque faltaban los módulos. Luego se implementó el contrato y la suite pasó. Esto demuestra una fase roja estructural y una verde, no certifica que todo el desarrollo haya seguido ciclos TDD exhaustivos.
Para mostrar TDD de una regla concreta: acuerda un nuevo criterio, escribe una prueba que falle por esa regla, ejecuta `npm test`, implementa el mínimo cambio y repite. Finalmente refactoriza sin alterar resultados. Registra las tres etapas con commits propios. No cambies criterios solamente para hacer pasar una prueba.
