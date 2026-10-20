import {inject,Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Tarea,Formulario} from '../entidades/Tarea';
@Injectable({providedIn:'root'})
export class TareaServicio{
 private http=inject(HttpClient);
 listar(){return firstValueFrom(this.http.get<Tarea[]>('/api/tareas'));}
 guardar(datos:Formulario,id:number|null){return firstValueFrom(id===null?this.http.post<Tarea>('/api/tareas',datos):this.http.put<Tarea>('/api/tareas/'+id,datos));}
 eliminar(id:number){return firstValueFrom(this.http.delete<void>('/api/tareas/'+id));}
}
