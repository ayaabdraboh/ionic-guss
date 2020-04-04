import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditallPageRoutingModule } from './editall-routing.module';

import { EditallPage } from './editall.page';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditallPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditallPage
      }
    ])
  ],

  
  declarations: [EditallPage]
})
export class EditallPageModule {}
