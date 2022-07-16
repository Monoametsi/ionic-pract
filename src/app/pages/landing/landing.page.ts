import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { budgetItem } from 'src/app/shared/budget-item';
import { LoadingController, ModalController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit/*, AfterViewInit */{
  // @ViewChild('income') income;
  closeLoad: boolean;
  isModalOpen: boolean;
  modal: HTMLElement;
  budgetItems: budgetItem[] = [];
  budgetCalcForm: FormGroup;
  
  constructor(@Inject(DOCUMENT) document: Document, public loader: LoadingController, private apiService: ApiService, public modalController: ModalController, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    // this.runLoader();

    this.budgetCalcForm = this.formBuilder.group({
      total_expense: new FormControl('0'),
      total_income: new FormControl('0'),
      total_budget: new FormControl('0')
    })
    this.getBudgetItems();
    this.blockNanForTotals();
  }
  
  // ngAfterViewInit(): void {}

  async getLoader(){
    const loader = (await this.loader.create());
    return loader;
  }

  async presentLoader(){
    const loader = await this.getLoader();
    loader.present();
  }

  async dismissLoader(){
   await this.loader.dismiss({
      'dismissed': true
    })
  }

  NanBlocker(e: { key: number; }) {
    if(isNaN(e.key)){
      return false;
    }
  }

  blockNanForTotals(){
    const inputs: HTMLCollectionOf<Element> = document.getElementsByClassName('form-control') as HTMLCollectionOf<HTMLInputElement>;

    for(let i = 0; i < inputs.length; i++){
      const input = (<HTMLInputElement> inputs[i]);

      input.onkeydown = () => {
        return false;
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

  async getBudgetItems(){
    this.apiService.getBudgetItems().subscribe(
      (res) => {
        this.budgetItems = res;
        this.closeLoad = true;
        console.log(res);
        this.setTotalValsTimer();
      }, (err) => {
        console.log(err);
      })
  }

  newlyAddedItem(){
    this.apiService.getBudgetItems().subscribe(
      async (res) => {
        const newItem = res[res.length - 1];
        this.budgetItems.push(newItem);
        this.setTotalValsTimer();
      }, (err) => {
        console.log(err);
      })
  }

  change: string | NodeJS.Timeout = 'false';
  
  updateBudgetItem(id: number, event: { srcElement: { value: string; }; }, item: budgetItem){
    item.amount = Number(event.srcElement.value.trim());
    this.setTotalVals()
    if(this.change !== 'false') clearTimeout(this.change);
    this.change = setTimeout(() => {
          this.apiService.updateBudgetItem(id, item).subscribe((res) => {
        }, (err) => {
          console.log(err)
        })
        this.change = 'false';
    },300); 
  }

  async removeBudgetItems(id: number){
    await this.presentLoader();
    this.apiService.removeBudgetItems(id).subscribe(async (res) => {
      const findItemPos = this.budgetItems.findIndex((budgetItem: budgetItem) => {
        return budgetItem.id === id
      })
  
      this.budgetItems.splice(findItemPos, 1);
      this.setTotalValsTimer();
      await this.dismissLoader();
    }, (err) => {
      console.log(err);
    });
  }
  
  async presentModal(event: { el: { id: string; }; }) {
    const modalTitle: string  = (event.el.id === 'expense')? 'Add Expense' : 'Add Income';
    
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        'modalTitle': modalTitle
      }
    });

    await modal.present();
    const isItemAdded = await modal.onDidDismiss();
    if(isItemAdded.data && isItemAdded.data.itemAdded){
      this.newlyAddedItem();
    }
  }

}