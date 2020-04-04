import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditallPage } from './editall.page';

const routes: Routes = [
  {
    path: '',
    component: EditallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditallPageRoutingModule {}
