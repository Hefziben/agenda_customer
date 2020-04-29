import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikePagePage } from './like-page.page';

const routes: Routes = [
  {
    path: '',
    component: LikePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikePagePageRoutingModule {}
