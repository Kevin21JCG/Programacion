export type Estado='Pendiente'|'En curso'|'En revisión'|'Completada';
export type Prioridad='Baja'|'Media'|'Alta';
export interface Tarea{id:number;titulo:string;descripcion:string;responsable:string;prioridad:Prioridad;estado:Estado;creada:string;actualizada:string;}
export type Formulario=Pick<Tarea,'titulo'|'descripcion'|'responsable'|'prioridad'|'estado'>;
