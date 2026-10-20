import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {crearRepositorio,validar} from '../backend/servicios/TareaServicio.js';
import {crearServidor} from '../backend/servidor.js';
const tarea={titulo:'Preparar especificación',descripcion:'RF01',responsable:'Kevin',prioridad:'Alta',estado:'Pendiente'};
test('RF01 rechaza campos vacíos, tipos y límites incorrectos',()=>{
 for(const cambio of [{titulo:' '},{titulo:'ab'},{titulo:'x'.repeat(101)},{responsable:''},{responsable:15},{prioridad:'Urgente'},{estado:'Archivada'},{descripcion:'x'.repeat(1001)}])assert.throws(()=>validar({...tarea,...cambio}));
 assert.equal(validar({...tarea,titulo:'  Preparar API  '}).titulo,'Preparar API');
});
test('RF03 y RF04 edición, eliminación y registros inexistentes',()=>{
 const r=crearRepositorio(':memory:');try{const t=r.crear(tarea);assert.equal(r.listar().length,1);assert.equal(r.actualizar(t.id,{...tarea,estado:'Completada'}).estado,'Completada');r.eliminar(t.id);assert.equal(r.listar().length,0);assert.throws(()=>r.obtener(t.id),e=>e.status===404);assert.throws(()=>r.actualizar(t.id,tarea),e=>e.status===404);}finally{r.cerrar();}
});
test('RF05 persistencia real después de cerrar SQLite',()=>{
 const dir=mkdtempSync(join(tmpdir(),'devtask-'));try{let r=crearRepositorio(join(dir,'prueba.db'));r.crear(tarea);r.cerrar();r=crearRepositorio(join(dir,'prueba.db'));assert.equal(r.listar()[0].titulo,tarea.titulo);r.cerrar();}finally{rmSync(dir,{recursive:true,force:true});}
});
test('RF05 conserva comillas y texto SQL como datos',()=>{
 const r=crearRepositorio(':memory:');try{const titulo="O'Reilly; DROP TABLE tareas; --";r.crear({...tarea,titulo});assert.equal(r.listar()[0].titulo,titulo);}finally{r.cerrar();}
});
test('API HTTP creación, validación, lectura, edición y borrado',async()=>{
 const r=crearRepositorio(':memory:');const s=crearServidor(r);await new Promise(resolve=>s.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${s.address().port}/api`;
 const req=(path,method='GET',body)=>fetch(base+path,{method,headers:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
 try{
 assert.equal((await req('/salud')).status,200);
 assert.equal((await req('/tareas','POST',{...tarea,titulo:''})).status,400);
 let res=await req('/tareas','POST',tarea);assert.equal(res.status,201);const t=await res.json();
 assert.equal((await (await req('/tareas')).json()).length,1);
 res=await req(`/tareas/${t.id}`,'PUT',{...tarea,estado:'En revisión'});assert.equal((await res.json()).estado,'En revisión');
 assert.equal((await req('/tareas/999','PUT',tarea)).status,404);
 assert.equal((await req('/tareas/1.5')).status,404);
 assert.equal((await req(`/tareas/${t.id}`,'DELETE')).status,204);
 assert.equal((await req(`/tareas/${t.id}`)).status,404);
 assert.equal((await fetch(base+'/tareas',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'})).status,400);
 assert.equal((await req('/tareas','POST',{...tarea,descripcion:'x'.repeat(17000)})).status,413);
 }finally{await new Promise(resolve=>s.close(resolve));r.cerrar();}
});
