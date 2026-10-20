import {Component,OnInit,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TareaServicio} from '../servicios/TareaServicio';
import {Tarea,Formulario,Estado} from '../entidades/Tarea';
@Component({selector:'app-raiz',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./aplicacion.html'})
export class Aplicacion implements OnInit{
 private api=inject(TareaServicio);tareas:Tarea[]=[];estados:Estado[]=['Pendiente','En curso','En revisión','Completada'];busqueda='';prioridad='';cargando=false;guardando=false;error='';aviso='';modal=false;editando:number|null=null;eliminando:Tarea|null=null;
 formulario:Formulario=this.vacio();
 vacio():Formulario{return {titulo:'',descripcion:'',responsable:'',prioridad:'Media',estado:'Pendiente'};}
 ngOnInit(){this.cargar();}
 async cargar(){this.cargando=true;this.error='';try{this.tareas=await this.api.listar();}catch(e){this.mostrarError(e);}finally{this.cargando=false;}}
 contar(e:Estado){return this.tareas.filter(t=>t.estado===e).length;}
 filtrar(e:Estado){const q=this.busqueda.trim().toLocaleLowerCase();return this.tareas.filter(t=>t.estado===e&&(!this.prioridad||t.prioridad===this.prioridad)&&(!q||`${t.titulo} ${t.responsable}`.toLocaleLowerCase().includes(q)));}
 abrir(t?:Tarea){this.error='';this.editando=t?.id??null;this.formulario=t?{titulo:t.titulo,descripcion:t.descripcion,responsable:t.responsable,prioridad:t.prioridad,estado:t.estado}:this.vacio();this.modal=true;setTimeout(()=>document.getElementById('titulo')?.focus());}
 cerrar(){if(!this.guardando){this.modal=false;setTimeout(()=>document.getElementById('nueva')?.focus());}}
 async guardar(){this.guardando=true;this.error='';try{await this.api.guardar(this.formulario,this.editando);this.modal=false;this.aviso='Tarea guardada correctamente.';await this.cargar();}catch(e){this.mostrarError(e);}finally{this.guardando=false;}}
 async borrar(){if(!this.eliminando)return;this.guardando=true;try{await this.api.eliminar(this.eliminando.id);this.eliminando=null;this.aviso='Tarea eliminada.';await this.cargar();}catch(e){this.mostrarError(e);}finally{this.guardando=false;}}
 mostrarError(e:unknown){const err=e as {error?:{error?:string}};this.error=err.error?.error||'No se pudo conectar. Comprueba que el servidor esté encendido e inténtalo otra vez.';}
 foco(event:KeyboardEvent){if(event.key!=='Tab')return;const elementos=Array.from((event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('button:not([disabled]),input,textarea,select'));const primero=elementos[0],ultimo=elementos[elementos.length-1];if(event.shiftKey&&document.activeElement===primero){event.preventDefault();ultimo.focus();}else if(!event.shiftKey&&document.activeElement===ultimo){event.preventDefault();primero.focus();}}
}
