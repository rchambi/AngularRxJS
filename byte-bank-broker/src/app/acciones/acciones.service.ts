import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Accion, AccionesApi } from './modelo/acciones';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  constructor(private httpclient : HttpClient) { }

  getAcciones(valor? : string){
    const  params = valor ? new HttpParams().append('valor' , valor) : undefined;
    return this.httpclient.get<AccionesApi>('http://localhost:3000/acciones',{params})
    .pipe(
      //para ver los datos
      //  tap( (x) => console.log(x)), 
      // map((api)=> api.payload),
      pluck('payload'), // obtiene el contenido del array de payload
      map((acciones) => 
        acciones.sort((a,b)=> this.ordenByCode(a,b))
      )
    );
  }

  private ordenByCode(a:Accion, b:Accion){

    if (a.codigo > b.codigo) {
      return 1;
    }

    if (a.codigo > b.codigo) {
      return -1;
    }

    return 0;
  }
}
