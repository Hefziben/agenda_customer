import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvideListPage } from './provide-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProvideListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvideListPageRoutingModule {}
