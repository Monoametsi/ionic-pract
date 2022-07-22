import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
  styleUrls: ['./add-budget-modal.component.scss'],
})
export class AddBudgetModalComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  async dismiss(){
    this.modalCtrl.dismiss({
      'dismiss': true
    })
  }

}
