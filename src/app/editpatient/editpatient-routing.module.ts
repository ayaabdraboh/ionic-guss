import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpatientPage } from './editpatient.page';

const routes: Routes = [
  {
    path: '',
    component: EditpatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpatientPageRoutingModule {}
