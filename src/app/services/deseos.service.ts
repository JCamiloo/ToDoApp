import { Platform } from '@ionic/angular';
import { Lista } from './../models/lista.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas:Lista[] = [];

  constructor(private plt:Platform, private storage: Storage) { 
    this.cargarLista();
  }

  crearLista(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarLista();
    return nuevaLista.id;
  }

  borrarLista(lista:Lista){
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
    this.guardarLista();
  }

  guardarLista(){
    if(this.plt.is("cordova")){
      this.storage.set('data',this.listas);
    }
    else{
      localStorage.setItem('data', JSON.stringify(this.listas));
    }
  }

  cargarLista(){
    if(this.plt.is('cordova')){
      this.storage.ready().then(() => {
        this.storage.get('data').then((listas) => {
          if(listas){
            this.listas = listas;
          }
        });
      });
    }
    else{
      if(localStorage.getItem('data')){
        this.listas = JSON.parse(localStorage.getItem('data'));
      }
    }
  }

  buscarLista(id:string | number){
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id);
  }
}
