import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostStatusPageRoutingModule } from './post-status-routing.module';

import { PostStatusPage } from './post-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostStatusPageRoutingModule
  ],
  declarations: [PostStatusPage]
})
export class PostStatusPageModule {}
