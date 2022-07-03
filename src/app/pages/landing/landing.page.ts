import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { budgetItem } from 'src/app/shared/budget-item';
import { ModalController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

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
  budgetCalcForm: FormGroup;

  constructor(@Inject(DOCUMENT) document: Document, public modalController: ModalController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.budgetCalcForm = this.formBuilder.group({
      total_expense: new FormControl('0'),
      total_income: new FormControl('0'),
      total_budget: new FormControl('0')
    })
    
    this.getBudgetItems();
    
  }
  
  // ngAfterViewInit(): void {}

  setTotalVals(){
    const income: HTMLCollectionOf<Element> =  document.getElementsByClassName('income') as HTMLCollectionOf<HTMLInputElement>;
    const expense: HTMLCollectionOf<Element> = document.getElementsByClassName('expense') as HTMLCollectionOf<HTMLInputElement>;

    const totalSumCalc = (elemArr: HTMLCollectionOf<Element>) => {
      //console.log(elemArr);
      let totalSum: number = 0;
      for(let i = 0; i < elemArr.length; i++){
        const value = Number((<HTMLInputElement> elemArr[i]).value);
        totalSum += value;
      }
      
      return totalSum;
    }

    const returnTotals = () => {
      this.budgetCalcForm.controls['total_income'].setValue(totalSumCalc(income));
      this.budgetCalcForm.controls['total_expense'].setValue(totalSumCalc(expense));
      const totalBudget = Number(this.budgetCalcForm.value.total_income) - Number(this.budgetCalcForm.value.total_expense);
      this.budgetCalcForm.controls['total_budget'].setValue(totalBudget);
    }

      returnTotals();

    window.onload = () => {
      returnTotals();
    }
    
  }
  
  setTotalValsTimer(){
    setTimeout(()=>{
      this.setTotalVals();
    }, 300)
  }

  getBudgetItems(){
    if(localStorage.getItem('budget_items')){
      this.budgetItems = JSON.parse(localStorage.getItem('budget_items'));
      this.setTotalValsTimer();
      window.addEventListener('storage', (e) => {
        this.budgetItems = JSON.parse(localStorage.getItem('budget_items'));
          this.setTotalValsTimer()
        return;
      })
    }
  }
  
  updateBudgetItem(id: number, event: { srcElement: { value: string; }; }){
    const getBudgetItems = JSON.parse(localStorage.getItem('budget_items'));
    const findItemPos = getBudgetItems.findIndex((budgetItem: budgetItem) => {
      return budgetItem.id === id
    });
    
    getBudgetItems[findItemPos].amount = Number(event.srcElement.value);
    
    localStorage.setItem('budget_items', JSON.stringify(getBudgetItems));
    this.setTotalVals();

  }

  removeBudgetItems(id: number){
    const getBudgetItems = JSON.parse(localStorage.getItem('budget_items'));
    const findItemPos = getBudgetItems.findIndex((budgetItem: budgetItem) => {
      return budgetItem.id === id
    })

    getBudgetItems.splice(findItemPos, 1);
    
    localStorage.setItem('budget_items', JSON.stringify(getBudgetItems));
    this.budgetItems = JSON.parse(localStorage.getItem('budget_items'));
    this.setTotalValsTimer();
  }

  async presentModal(event: { el: { id: string; }; }) {
    let modalTitle: string;

    modalTitle = (event.el.id === 'expense')? 'Add Expense' : 'Add Income';
    
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        'modalTitle': modalTitle
      }
    });
    
    return await modal.present();
  }

}