import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  
  isModalOpen: boolean;
  modal: HTMLElement;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas'
      }
    });
    return await modal.present();
  }

  openModal(){
    this.isModalOpen = true;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
