import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  @Input() modalTitle: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  addFinanceType(){
    const expense = this.modalTitle.search(/expense/i);
    const income = this.modalTitle.search(/income/i);
    
    
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
