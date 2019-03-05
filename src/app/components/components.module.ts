import { PipesModule } from './../pipes/pipes.module';
import { ListasComponent } from './listas/listas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    ListasComponent
  ]
})
export class ComponentsModule { }
