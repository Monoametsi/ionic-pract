import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage} from './landing.page';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@NgModule({
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    CommonModule,
    IonicModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage, NavbarComponent, LoaderComponent]
})
export class LandingPageModule {}
