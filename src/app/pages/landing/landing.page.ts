import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { budgetItem } from 'src/app/shared/budget-item';
import { ModalController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';

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
  
  constructor(@Inject(DOCUMENT) document: Document, private apiService: ApiService, public modalController: ModalController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.budgetCalcForm = this.formBuilder.group({
      total_expense: new FormControl('0'),
      total_income: new FormControl('0'),
      total_budget: new FormControl('0')
    })
    
    this.getBudgetItems();
    this.blockNanForTotals();
    this.getNewAddedItems();
  }
  
  // ngAfterViewInit(): void {}

  NanBlocker(e) {
    if(isNaN(e.key)){
      return false;
    }
  }

  blockNanForTotals(){
    const inputs: HTMLCollectionOf<Element> = document.getElementsByClassName('form-control') as HTMLCollectionOf<HTMLInputElement>;

    for(let i = 0; i < inputs.length; i++){
      const input = (<HTMLInputElement> inputs[i]);

      input.onkeypress = (event) => {
        return this.NanBlocker(event);
      };
    }
  }

  setTotalVals(){
    const income: HTMLCollectionOf<Element> = document.getElementsByClassName('income') as HTMLCollectionOf<HTMLInputElement>;
    const expense: HTMLCollectionOf<Element> = document.getElementsByClassName('expense') as HTMLCollectionOf<HTMLInputElement>;

    const totalSumCalc = (elemArr: HTMLCollectionOf<Element>) => {
      
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
    this.apiService.getBudgetItems().subscribe(
      (res) => {
        this.budgetItems = res;
        this.setTotalVals();
      }, (err) => {
        console.log(err);
      })
  }

  getNewAddedItems(){
    window.addEventListener('storage', (e) => {
      this.getBudgetItems();
      this.setTotalValsTimer();
    })
  }
  
  updateBudgetItem(id: number, event: { srcElement: { value: string; }; }){
    this.apiService.updateBudgetItem(id, event.srcElement.value).subscribe((res) => {
      this.setTotalVals();
    }, (err) => {
      console.log(err)
    })
  }

  removeBudgetItems(id: number){
    this.apiService.removeBudgetItems(id).subscribe((res) => {
      this.budgetItems = res;
      this.setTotalValsTimer();
    }, (err) => {
      console.log(err);
    });
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