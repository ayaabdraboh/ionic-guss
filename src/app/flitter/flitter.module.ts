import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlitterPageRoutingModule } from './flitter-routing.module';

import { FlitterPage } from './flitter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlitterPageRoutingModule
  ],
  declarations: [FlitterPage]
})
export class FlitterPageModule {}
