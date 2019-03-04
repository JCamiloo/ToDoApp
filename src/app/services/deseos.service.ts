import { Lista } from './../models/lista.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas:Lista[] = [];

  constructor() { 
    const lista1 = new Lista('Recolectar');
    const lista2 = new Lista('Héroes');
    this.listas.push(lista1,lista2);
  }
}
