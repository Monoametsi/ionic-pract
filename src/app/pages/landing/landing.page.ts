import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit, AfterViewInit {
  @ViewChild('income') income;
  isModalOpen: boolean;
  modal: HTMLElement;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {}

  async presentModal(event) {
    // this.type.el.style.color = 'dark';
    console.log(event.el);
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas'
      }
    });
    
    return await modal.present();
  }

  openModal(isModalOpen){
    this.isModalOpen = true;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
