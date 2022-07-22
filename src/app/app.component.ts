import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddBudgetModalComponent } from './components/add-budget-modal/add-budget-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public modalCtrl: ModalController) {}

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: AddBudgetModalComponent
    })
    
    await modal.present();
  }
}
