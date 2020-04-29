import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikePagePageRoutingModule } from './like-page-routing.module';

import { LikePagePage } from './like-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikePagePageRoutingModule
  ],
  declarations: [LikePagePage]
})
export class LikePagePageModule {}
