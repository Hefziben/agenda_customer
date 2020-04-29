import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvideListPageRoutingModule } from './provide-list-routing.module';

import { ProvideListPage } from './provide-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvideListPageRoutingModule
  ],
  declarations: [ProvideListPage]
})
export class ProvideListPageModule {}
