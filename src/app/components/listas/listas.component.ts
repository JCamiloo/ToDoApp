import { Lista } from './../../models/lista.model';
import { DeseosService } from './../../services/deseos.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList) lista: IonList;

  constructor(public deseoService: DeseosService, private router: Router, private alertCtrl: AlertController) { 

  }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista:Lista){
    this.deseoService.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    const alert = await this.alertCtrl.create({
      header: 'Nuevo nombre de la lista',
      inputs: [{
        name:'titulo',
        type:'text',
        placeholder:lista.titulo,
      }],
      buttons:[
        {
          text:'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text:'Modificar',
          handler:data => {
            if(data.titulo.trim().length > 0){
              lista.titulo = data['titulo'];
              this.deseoService.guardarLista();
              this.lista.closeSlidingItems();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
