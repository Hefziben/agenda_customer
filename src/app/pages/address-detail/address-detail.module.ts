import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressDetailPageRoutingModule } from './address-detail-routing.module';

import { AddressDetailPage } from './address-detail.page';
import { environment } from "../../../environments/environment";
import { AgmCoreModule } from "@agm/core";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    }),
    AddressDetailPageRoutingModule
  ],
  declarations: [AddressDetailPage]
})
export class AddressDetailPageModule {}
