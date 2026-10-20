// Despliega temporalmente el build local y comprueba HTML y API sin tocar la BD real.
import {spawn} from 'node:child_process';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const dir=mkdtempSync(join(tmpdir(),'devtask-humo-'));const port=process.env.SMOKE_PORT||'3199';
const p=spawn(process.execPath,['backend/servidor.js'],{env:{...process.env,PORT:port,DEVTASK_DB:join(dir,'humo.db')},stdio:'inherit'});
try{
 let lista=false;for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${port}/api/salud`);if(r.ok){lista=true;break;}}catch{}await new Promise(r=>setTimeout(r,150));}
 assert.ok(lista,'El servidor debe iniciar');const html=await fetch(`http://127.0.0.1:${port}/`);assert.equal(html.status,200);assert.match(await html.text(),/<app-raiz/);
 const data=await fetch(`http://127.0.0.1:${port}/api/tareas`);assert.equal(data.status,200);assert.deepEqual(await data.json(),[]);console.log('Prueba HTTP de despliegue local: correcta.');
}finally{await new Promise(resolve=>{p.once('exit',resolve);p.kill();});rmSync(dir,{recursive:true,force:true});}
