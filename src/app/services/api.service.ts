import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { budgetItem } from '../shared/budget-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  addFinanceType(data: budgetItem){
    let budgetItems = [data];
    const setfinanceType = localStorage.set('budget_items',JSON.stringify(budgetItems));
  }

  deleteFinanceType(id: number){

  }
}
