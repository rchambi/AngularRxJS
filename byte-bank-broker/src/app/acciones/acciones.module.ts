import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccionesRoutingModule } from './acciones-routing.module';
import { AccionesComponent } from './acciones.component';
import { SharedModule } from '../shared/shared.module';
import { CardAccionesComponent } from './card-acciones/card-acciones.component';


@NgModule({
  declarations: [AccionesComponent, CardAccionesComponent],
  imports: [
    CommonModule,
    AccionesRoutingModule,
    SharedModule
  ]
})
export class AccionesModule { }
