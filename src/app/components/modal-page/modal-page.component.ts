import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { budgetItem } from 'src/app/shared/budget-item';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})

export class ModalPageComponent implements OnInit {

  @Input() modalTitle: string;
  addBudgetForm : FormGroup;
  submitted: boolean = false;

  constructor(public modalController: ModalController, public loader: LoadingController, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addBudgetForm = this.formBuilder.group({
      description: new FormControl('', {validators: [Validators.required]}),
      budget: new FormControl('', {validators: Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])})
    })
  }

  async presentLoader(){
    const loader = (await this.loader.create());
    loader.present();
  }
  
  async dismissLoader(){
   await this.loader.dismiss({
      'dismissed': true
    })
  }
  
  findBudgetType(budgetType:number){
    const type:string = (budgetType !== -1)? 'income' : 'expense';
    return type; 
  }

  controls(){
    return this.addBudgetForm.controls;
  }

  async addBudget(){
    this.submitted = true;
    
    if(this.addBudgetForm.invalid){
      return;
    }

    const isIncome:number = this.modalTitle.search(/income/i);

    const budgetType:string = this.findBudgetType(isIncome);

    const budget_item:budgetItem = {
      type: budgetType,
      description: this.addBudgetForm.value.description,
      amount: Number(this.addBudgetForm.value.budget)
    }
    
    await this.presentLoader();
    this.apiService.addBudget(budget_item).subscribe(async (res) => {
      this.dismiss(true);
      await this.dismissLoader();
    }, (err) => {
      console.log(err)
    })
  }

  dismiss(bool: boolean) {
    this.modalController.dismiss({
      'dismissed': true,
      'itemAdded': bool
    });
  }

}