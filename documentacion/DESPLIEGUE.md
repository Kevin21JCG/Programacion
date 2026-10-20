# Automatización de build, test y deploy
El workflow calidad.yml se ejecuta en push/PR y de forma manual. Instala dependencias fijadas, prueba API y dominio, compila Angular, levanta temporalmente la aplicación y consulta HTML y salud. Entrega un artefacto descargable. El servidor de prueba se cierra al terminar el job: no publica una URL permanente.

El workflow desplegar.yml permite un despliegue persistente manual en un laboratorio propio. Requiere un runner Linux con etiquetas self-hosted y devtask-lab, Docker y acceso al repositorio. Crea el environment laboratorio y configura aprobación si tu plan lo permite. Ejecuta solo desde main. El contenedor escucha exclusivamente en 127.0.0.1:3000 del laboratorio y usa un volumen SQLite que no se elimina al sustituir el contenedor. No ejecutes runners de confianza en PR de terceros.

Alternativa local sin Actions:
```
npm run build
npm start
```
Abre http://localhost:3000. Para detener usa Ctrl+C.

Docker opcional:
```
docker build -t devtask:local .
docker volume create devtask-datos
docker run --name devtask -p 127.0.0.1:3000:3000 -v devtask-datos:/datos devtask:local
```
La imagen ejecuta Node como usuario no root. Si un volumen externo tiene permisos incompatibles, asigna su propiedad al UID de node antes de iniciarlo. Conserva backups consistentes de SQLite antes de una migración. Esta versión no contiene migraciones destructivas.

Rollback propuesto: conservar la etiqueta del commit anterior y volver a iniciar esa imagen con el mismo volumen, después de comprobar compatibilidad del esquema. El workflow actual sustituye el contenedor y puede causar una interrupción breve. No implementa balanceador, HTTPS ni autenticación y no se presenta como despliegue público de producción.
