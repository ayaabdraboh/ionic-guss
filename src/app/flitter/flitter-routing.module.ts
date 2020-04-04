import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlitterPage } from './flitter.page';

const routes: Routes = [
  {
    path: '',
    component: FlitterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlitterPageRoutingModule {}
