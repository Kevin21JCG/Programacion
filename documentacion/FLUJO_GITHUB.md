# Publicar y demostrar el trabajo colaborativo

## Preparación
El repositorio de esta entrega ya está publicado en https://github.com/Kevin21JCG/Programacion, con la implementación en feat/gestion-tareas y el PR #2. Consulta EVIDENCIAS_GITHUB.md para ver los enlaces reales. Los pasos siguientes se conservan como guía para reproducir el proceso en un repositorio nuevo. El otro integrante debe revisar el PR desde su propia cuenta. No se debe simular su identidad.
1. En GitHub crea un repositorio `devtask-parcial-i` (privado si aún no quieres publicar). Déjalo vacío: sin README ni .gitignore.
2. Extrae el ZIP y abre la carpeta DevTask en VS Code. Instala Git si `git --version` falla.
3. Define tu identidad real con `git config --global user.name "Kevin Jahir Coronel Gaona"` y `git config --global user.email "TU_CORREO_DE_GITHUB"`. Sustituye el correo antes de ejecutar.
4. En terminal, dentro de DevTask:
```bash
git init -b main
git add .gitignore package.json package-lock.json documentacion .specify
git commit -m "docs: definir alcance y criterios de aceptación"
git remote add origin https://github.com/TU_USUARIO/devtask-parcial-i.git
git push -u origin main
git switch -c feat/gestion-tareas
git add .
git commit -m "feat: implementar tablero Angular con SQLite y pipeline"
git push -u origin feat/gestion-tareas
```
Sustituye TU_USUARIO por tu usuario. Autentícate en el gestor de credenciales de Git. No pegues tokens en el código. Estos commits son la publicación por etapas del paquete, no un registro histórico de dos semanas de trabajo.

## PR y revisión
5. En GitHub abre Compare & pull request: base main, compare feat/gestion-tareas. Título: Implementar gestión de tareas según RF01 a RF06. Completa la plantilla y enlaza el Issue correspondiente.
6. En Settings > Collaborators invita al integrante correcto tú mismo. Esta guía no envía invitaciones.
7. El compañero abre Files changed, revisa una validación y las pruebas. Comenta un hallazgo real y aprueba solo si está conforme. No puedes aprobar tu propio PR.
8. En Actions verifica el workflow Calidad y despliegue de prueba. Guarda URL y captura de los pasos test, build y humo. Si falla, abre el log, corrige en la misma rama y vuelve a subir.
9. Tras la revisión y CI correcto, integra el PR. En Settings configura una regla para main con revisión y comprobación obligatoria cuando tu plan de GitHub lo permita. No se considera aplicada hasta verificarla en la cuenta.
10. Si deseas mostrar un fallo controlado, crea una rama de práctica, modifica una validación, observa la prueba fallida y revierte la modificación. Nunca mezcles el fallo en main.

## Gestión
Crea un Project con columnas Pendiente, En curso, En revisión y Completada. Agrega los Issues del archivo PLAN_EQUIPO.md. Los hitos sugeridos son M1 Especificación, M2 Implementación y M3 Validación. Coloca responsables reales y conserva el enlace de cada Issue, PR y pipeline.

## Evidencias mínimas
E01 URL y vista del repositorio. E02 ramas e historial. E03 Issue y criterios. E04 tablero Project. E05 milestone. E06 PR y diferencia. E07 revisión real del compañero. E08 pipeline correcto. E09 build Angular. E10 CRUD. E11 persistencia después de reiniciar. E12 prompts y revisión de Copilot. E13 especificación, plan y tareas. E14 prueba roja y verde.
No presentar el plan ni los archivos de configuración como capturas de actividades remotas ya ejecutadas.
