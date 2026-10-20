import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep,dirname} from 'node:path';
import {crearRepositorio,ErrorAplicacion} from './servicios/TareaServicio.js';
const raiz=resolve(dirname(fileURLToPath(import.meta.url)),'..');
async function cuerpo(req){
 if(!req.headers['content-type']?.includes('application/json'))throw new ErrorAplicacion('Usa Content-Type application/json.',415);
 let bytes=0;const partes=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>16384)throw new ErrorAplicacion('La solicitud es demasiado grande.',413);partes.push(chunk);}
 try{return JSON.parse(Buffer.concat(partes).toString('utf8'));}catch{throw new ErrorAplicacion('JSON inválido.');}
}
export function crearServidor(repo){return createServer(async(req,res)=>{
 const enviar=(status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});res.end(obj===undefined?undefined:JSON.stringify(obj));};
 try{
 const ruta=new URL(req.url,'http://localhost').pathname;
 if(ruta==='/api/salud'&&req.method==='GET')return enviar(200,{estado:'ok'});
 if(ruta==='/api/tareas'){
 if(req.method==='GET')return enviar(200,repo.listar());
 if(req.method==='POST')return enviar(201,repo.crear(await cuerpo(req)));
 return enviar(405,{error:'Método no permitido.'});
 }
 const match=ruta.match(/^\/api\/tareas\/(\d+)$/);
 if(match){const id=Number(match[1]);if(!Number.isSafeInteger(id)||id<1)throw new ErrorAplicacion('Identificador inválido.');
 if(req.method==='GET')return enviar(200,repo.obtener(id));
 if(req.method==='PUT')return enviar(200,repo.actualizar(id,await cuerpo(req)));
 if(req.method==='DELETE'){repo.eliminar(id);return enviar(204);}
 return enviar(405,{error:'Método no permitido.'});
 }
 if(ruta.startsWith('/api/'))return enviar(404,{error:'Ruta no encontrada.'});
 if(req.method!=='GET'&&req.method!=='HEAD')return enviar(405,{error:'Método no permitido.'});
 const base=resolve(raiz,'frontend/dist/devtask/browser');
 const relativa=decodeURIComponent(ruta).replace(/^\/+/, '');const archivo=resolve(base,relativa||'index.html');
 if(archivo!==base&&!archivo.startsWith(base+sep))return enviar(403,{error:'Ruta no permitida.'});
 let data;try{data=await readFile(archivo);}catch{if(extname(archivo))return enviar(404,{error:'Archivo no encontrado.'});data=await readFile(resolve(base,'index.html'));}
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
 res.writeHead(200,{'Content-Type':(mime[extname(archivo)]||'text/html')+'; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);
 }catch(e){enviar(e.status||500,{error:e.status?e.message:'No se pudo completar la operación.'});}
 });}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const repo=crearRepositorio(process.env.DEVTASK_DB||resolve(raiz,'backend/datos/devtask.db'));
 const servidor=crearServidor(repo);servidor.listen(Number(process.env.PORT||3000),process.env.HOST||'127.0.0.1',()=>console.log('DevTask: http://localhost:'+ (process.env.PORT||3000)));
 for(const s of ['SIGINT','SIGTERM'])process.on(s,()=>servidor.close(()=>{repo.cerrar();process.exit(0);}));
}
