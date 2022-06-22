import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit/*, AfterViewInit */{
  // @ViewChild('income') income;
  isModalOpen: boolean;
  modal: HTMLElement;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  
  // ngAfterViewInit(): void {}

  async presentModal(event: { el: { id: string; }; }) {
    let modalTitle: string;
    
    if(event.el.id === 'expense'){
      modalTitle = 'Add Expense'
    }else{
      modalTitle = 'Add Income'
    }
    
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        'modalTitle': modalTitle
      }
    });
    
    return await modal.present();
  }

}
