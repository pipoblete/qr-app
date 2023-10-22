import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarPageRoutingModule } from './mostrar-routing.module';

import { MostrarPage } from './mostrar.page';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarPageRoutingModule
  ],
  declarations: [MostrarPage],
  providers: [AuthService]
})
export class MostrarPageModule {}
