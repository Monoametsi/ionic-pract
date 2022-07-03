import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';

import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'modal',
    component: ModalPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
