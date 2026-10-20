import {spawn} from 'node:child_process';
const hijos=[spawn(process.execPath,['backend/servidor.js'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/@angular/cli/bin/ng.js','serve','--host','127.0.0.1'],{cwd:'frontend',stdio:'inherit'})];
// Cada proceso usa su directorio de trabajo.
hijos[1].on('error',console.error);
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{for(const p of hijos)p.kill();});
for(const p of hijos)p.on('exit',code=>{if(code){for(const otro of hijos)if(otro!==p)otro.kill();process.exitCode=code;}});
