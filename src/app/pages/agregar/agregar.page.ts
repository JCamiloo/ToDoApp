import { ListaItem } from './../../models/lista-item.model';
import { Lista } from './../../models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor(private deseoService: DeseosService, private route: ActivatedRoute, private toastCtrl: ToastController) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseoService.buscarLista(listaId);   
  }

  ngOnInit() {
  }

  async agregarItem(){
    if(this.nombreItem.trim().length == 0){
      const toast = await this.toastCtrl.create({
        message: 'Debe ingresar un item',
        duration: 1500,
        position: 'bottom'
      });
      
      toast.present();
    }
    else{
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoItem);
      this.nombreItem = "";
      this.deseoService.guardarLista();
    }
  }

  async borrarItem(i:number){
    this.lista.items.splice(i,1);
    this.deseoService.guardarLista();
    const toast = await this.toastCtrl.create({
      message: 'Item eliminado',
      duration: 1500,
      position: 'bottom'
    });
    
    toast.present();
  }

  cambioCheck(){
    //Filter regresa una colección de elementos que cumplan una condición 
    //Retorna arreglo con todos los items pendientes
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;

    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }
    else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseoService.guardarLista();    
  }

}
