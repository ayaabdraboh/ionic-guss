import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpatientPageRoutingModule } from './editpatient-routing.module';

import { EditpatientPage } from './editpatient.page';


import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditpatientPageRoutingModule
  ],
  declarations: [EditpatientPage]
})
export class EditpatientPageModule {}
