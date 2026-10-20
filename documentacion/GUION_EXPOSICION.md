# Guion de exposición

Duración sugerida: 12–15 minutos más la demostración. Distribución propuesta: Kevin presenta 1–8 y el segundo integrante 9–16. Confirmar que ambos comprendan toda la aplicación.

## 1. DevTask
Presentar el problema de la empresa y explicar que DevTask es el piloto. El segundo integrante y el docente deben registrarse antes de entregar.

## 2. El problema de la empresa
Explicar que instalar herramientas no basta. El equipo necesita acordar cómo se integra un cambio y qué evidencia debe acompañarlo. Caso tomado del enunciado del proyecto.

## 3. Control de versiones
Explicar que Git es el control de versiones y GitHub ofrece colaboración. Un commit agrupa una intención. Rebase reescribe commits y debe usarse con cuidado en historia compartida. Fuente: https://git-scm.com/book/en/v2/Git-Branching-Rebasing

## 4. Git Flow y Trunk Based
La elección depende del contexto. Para dos personas y dos semanas proponemos ramas cortas y revisión. No afirmamos que Git Flow sea incorrecto. Fuentes: https://nvie.com/posts/a-successful-git-branching-model/ y https://trunkbaseddevelopment.com/

## 5. Colaboración con Pull Requests
Demostrar la plantilla de PR. Una revisión de otra persona todavía debe realizarse en GitHub. La cuenta del autor no puede aprobar su propio PR. Fuente: https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request

## 6. Especificaciones antes del código
Abrir documentacion/especificaciones/001-tareas/spec.md y relacionar RF01 con validar y la prueba. Los documentos fueron escritos manualmente y no prueban ejecución de Spec Kit. Fuente: https://github.com/github/spec-kit

## 7. Arquitectura del piloto
Explicar la secuencia: el navegador envía JSON a /api/tareas, el servidor valida y guarda con parámetros en SQLite, después devuelve JSON. El frontend nunca abre la BD. Usamos Node 24 y Angular 20.3. Fuente de compatibilidad: https://angular.dev/reference/versions

## 8. DevTask en funcionamiento
Demostración en vivo: abrir localhost:4200, crear Revisar RF01 con responsable Kevin, editar a En revisión, buscar, recargar y eliminar. Mostrar que los conteos globales no cambian por filtrar. El sistema es una práctica local sin login.

## 9. Calidad y TDD
La primera prueba roja de esta preparación falló por módulos no implementados. No equivale a probar todos los ciclos TDD. Mostrar un caso concreto de negocio al exponer. Fuente: https://martinfowler.com/bliki/TestDrivenDevelopment.html

## 10. Pipeline de calidad
Abrir calidad.yml. Explicar que un workflow configurado no es una ejecución de GitHub. Al publicarlo, mostrar run real con pasos. El segundo workflow manual usa runner propio y Docker. Fuente: https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs

## 11. Copilot con revisión humana
Explicar qué aceptamos y qué corregimos de una recomendación. Esta entrega se preparó con ChatGPT y no demuestra uso real de Copilot. Documentar una sesión propia de Copilot y la revisión. Fuente: https://docs.github.com/en/copilot/responsible-use/agents

## 12. Organización del equipo
Mostrar PLAN_EQUIPO.md. La distribución es propuesta y el segundo nombre está pendiente. Cada integrante implementa y revisa cambios del otro. Fuentes: https://docs.github.com/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects y https://docs.github.com/issues/using-labels-and-milestones-to-track-work/about-milestones

## 13. Resultados y límites
Las pruebas y la compilación también se ejecutaron correctamente en GitHub Actions. Mostrar el PR 2 de Kevin21JCG/Programacion y el run 39438736198. Falta la revisión del segundo integrante y las demostraciones personales que correspondan.

## 14. Propuesta para la empresa
Defender la elección de SQLite por facilidad de reproducción. El sistema es local sin control de acceso y usa última escritura en edición. La ampliación empresarial requiere diseño adicional.

## 15. Reflexión y conclusiones
Responder las cuatro preguntas del enunciado. Como valoración de la propuesta, Actions es especialmente útil por dar una comprobación común. No afirmar que hubo un estudio comparativo de productividad.

## 16. Fuentes principales
Referencias completas en el informe APA 7. https://git-scm.com/book/en/v2/ ; https://docs.github.com/ ; https://github.com/github/spec-kit ; https://angular.dev/reference/versions ; https://nvie.com/posts/a-successful-git-branching-model/ ; https://trunkbaseddevelopment.com/ ; https://martinfowler.com/bliki/TestDrivenDevelopment.html

