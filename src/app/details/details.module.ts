import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailsPage
      }
    ])
  ],
  
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
