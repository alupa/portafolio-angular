import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve, reject) => {
      this.http.get('https://html-angular-aa5b2.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          // console.log(resp);
          this.productos = resp;
          this.cargando = false;
          // setTimeout(() => {
          //   this.cargando = false;
          // }, 2000);
          resolve();
        });
    });
    
  }

  public getProducto(id: string){
    return this.http.get(`https://html-angular-aa5b2.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto(termino: string){
    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(() => {
        //esto se ejecutará despues de cargar los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicar filtro
        this.filtrarProductos(termino);
    }
    
  }

  private filtrarProductos( termino: string){
    // this.productosFiltrado = this.productos.filter( producto => {
    //   return true;
    // });
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
    // console.log(this.productosFiltrado);
  }
}
