import { FiltroCompletadoPipe } from './filtro-completado.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FiltroCompletadoPipe],
  exports: [FiltroCompletadoPipe  ]
})
export class PipesModule { }
