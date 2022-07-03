import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { budgetItem } from 'src/app/shared/budget-item'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})

export class ModalPageComponent implements OnInit {

  @Input() modalTitle: string;
  addBudgetForm : FormGroup;
  submitted: boolean = false;

  constructor(public modalController: ModalController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addBudgetForm = this.formBuilder.group({
      description: new FormControl('', {validators: [Validators.required]}),
      budget: new FormControl('', {validators: Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])})
    })
  }

  idGenerator():number{
    const id: number = (Math.random() * 100) + 1;
    const convertTo5dec:number = Number(id.toFixed(5));
    return convertTo5dec;
  }
  
  findBudgetType(budgetType:number){
    const type:string = (budgetType !== -1)? 'income' : 'expense';
    return type; 
  }

  controls(){
    // console.log(this.addBudgetForm.controls);
    return this.addBudgetForm.controls;
  }

  addBudget(){
    this.submitted = true;
    // console.log(this.controls());
    if(this.addBudgetForm.invalid){
      return;
    }

    const isIncome = this.modalTitle.search(/income/i);

    const budget_item:budgetItem = {
      id: this.idGenerator(),
      type: this.findBudgetType(isIncome),
      description: this.addBudgetForm.value.description,
      amount: Number(this.addBudgetForm.value.budget)
    }
    
    let budgetItems: budgetItem[] = [];
    
    const setBudgetItems = (budgetData: budgetItem[]) => {
      localStorage.setItem('budget_items', JSON.stringify(budgetData));
      window.dispatchEvent( new Event('storage') )
      this.dismiss();
      return budgetData;
    }

    if(!localStorage.getItem('budget_items')){
      budgetItems = [budget_item];
      return setBudgetItems(budgetItems);
    }

    budgetItems = JSON.parse(localStorage.getItem('budget_items'));
    budgetItems.push(budget_item);

    return setBudgetItems(budgetItems);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}