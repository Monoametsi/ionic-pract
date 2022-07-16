import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage} from './landing.page';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@NgModule({
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    CommonModule,
    IonicModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage, LoaderComponent]
})
export class LandingPageModule {}
