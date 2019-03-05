import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseoService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController){
  }

  async agregarLista(){
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [{
        name:'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: async (data) =>{
            if(data['titulo'].trim().length > 0){
              const listaId = this.deseoService.crearLista(data['titulo']);
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
            else{
              let toast = await this.toastCtrl.create({
                message: 'La lista debe tener un nombre',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
