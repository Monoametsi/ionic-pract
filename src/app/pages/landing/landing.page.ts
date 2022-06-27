import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';
import { budgetItem } from 'src/app/shared/budget-item';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit/*, AfterViewInit */{
  // @ViewChild('income') income;
  isModalOpen: boolean;
  modal: HTMLElement;
  budgetItems: budgetItem[] = [];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.getBudgetItems()
  }
  
  // ngAfterViewInit(): void {}

  getBudgetItems(){
    
    if(localStorage.getItem('budget_items')){
      this.budgetItems = JSON.parse(localStorage.getItem('budget_items'));

      window.addEventListener('storage', (e) => {
        return this.budgetItems = JSON.parse(localStorage.getItem('budget_items'));
      })
    }
  }

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
