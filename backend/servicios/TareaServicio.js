import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
export class ErrorAplicacion extends Error{constructor(message,status=400){super(message);this.status=status;}}
export function validar(datos){
 if(!datos||typeof datos!=='object'||Array.isArray(datos))throw new ErrorAplicacion('Se espera un objeto JSON.');
 const texto=(clave,min,max)=>{const valor=datos[clave];if(typeof valor!=='string'||valor.trim().length<min||valor.trim().length>max)throw new ErrorAplicacion(`${clave}: debe tener entre ${min} y ${max} caracteres.`);return valor.trim();};
 const titulo=texto('titulo',3,100),descripcion=texto('descripcion',0,1000),responsable=texto('responsable',1,80);
 if(!['Baja','Media','Alta'].includes(datos.prioridad))throw new ErrorAplicacion('Prioridad inválida.');
 if(!['Pendiente','En curso','En revisión','Completada'].includes(datos.estado))throw new ErrorAplicacion('Estado inválido.');
 return {titulo,descripcion,responsable,prioridad:datos.prioridad,estado:datos.estado};
}
export function crearRepositorio(archivo){
 if(archivo!==':memory:')mkdirSync(dirname(archivo),{recursive:true});
 const db=new DatabaseSync(archivo);db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS tareas(id INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT NOT NULL CHECK(length(titulo) BETWEEN 3 AND 100),descripcion TEXT NOT NULL DEFAULT '',responsable TEXT NOT NULL,prioridad TEXT NOT NULL CHECK(prioridad IN ('Baja','Media','Alta')),estado TEXT NOT NULL CHECK(estado IN ('Pendiente','En curso','En revisión','Completada')),creada TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,actualizada TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
 const obtener=id=>{const t=db.prepare('SELECT * FROM tareas WHERE id=?').get(id);if(!t)throw new ErrorAplicacion('La tarea no existe.',404);return t;};
 return {
 listar:()=>db.prepare('SELECT * FROM tareas ORDER BY id DESC').all(),obtener,
 crear:datos=>{const d=validar(datos);const r=db.prepare('INSERT INTO tareas(titulo,descripcion,responsable,prioridad,estado) VALUES(?,?,?,?,?)').run(d.titulo,d.descripcion,d.responsable,d.prioridad,d.estado);return obtener(Number(r.lastInsertRowid));},
 actualizar:(id,datos)=>{const d=validar(datos);obtener(id);db.prepare('UPDATE tareas SET titulo=?,descripcion=?,responsable=?,prioridad=?,estado=?,actualizada=CURRENT_TIMESTAMP WHERE id=?').run(d.titulo,d.descripcion,d.responsable,d.prioridad,d.estado,id);return obtener(id);},
 eliminar:id=>{obtener(id);db.prepare('DELETE FROM tareas WHERE id=?').run(id);},cerrar:()=>db.close()
 };
}
