import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) { 
    //console.log('Servicio de infoPagina cargada');
    //Leer el archivo Json
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
          //console.log(resp);
          //console.log( resp['twitter'] );
        });
  }

  private cargarEquipo(){
    this.http.get('https://html-angular-aa5b2.firebaseio.com/equipo.json')
        .subscribe( (resp: any) => {
          this.equipo = resp;
          console.log(resp);
        }); 
  }
}
