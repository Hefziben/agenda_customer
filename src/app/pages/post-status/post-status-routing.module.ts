import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostStatusPage } from './post-status.page';

const routes: Routes = [
  {
    path: '',
    component: PostStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostStatusPageRoutingModule {}
