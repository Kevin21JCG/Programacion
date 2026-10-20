import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {Aplicacion} from './app/vistas/Aplicacion';
bootstrapApplication(Aplicacion,{providers:[provideHttpClient()]}).catch(console.error);
