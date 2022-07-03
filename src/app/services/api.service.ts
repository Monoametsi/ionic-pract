import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { budgetItem } from '../shared/budget-item';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  idGenerator():number{
    const id: number = (Math.random() * 100) + 1;
    const convertTo5dec:number = Number(id.toFixed(5));
    return convertTo5dec;
  }

  addBudget(addBudgetForm:FormGroup, budgetType: string): Observable<budgetItem[]>{
    let budgetItems: budgetItem[] = [];

    const budget_item:budgetItem = {
      id: this.idGenerator(),
      type: budgetType,
      description: addBudgetForm.value.description,
      amount: Number(addBudgetForm.value.budget)
    }
    
    const setBudgetItems = (budgetData: budgetItem[]) => {
      localStorage.setItem('budget_items', JSON.stringify(budgetData));
      window.dispatchEvent( new Event('storage') )
      return of(budgetData);
    }

    if(!localStorage.getItem('budget_items')){
      budgetItems = [budget_item];
      return setBudgetItems(budgetItems);
    }

    budgetItems = JSON.parse(localStorage.getItem('budget_items'));
    budgetItems.push(budget_item);

    return setBudgetItems(budgetItems);
  }

  getBudgetItems(): Observable<budgetItem[]>{
    let budgetItems = [];
    if(localStorage.getItem('budget_items')){
      budgetItems = JSON.parse(localStorage.getItem('budget_items'));
      // window.addEventListener('storage', (e) => {
      //   budgetItems = JSON.parse(localStorage.getItem('budget_items'));
      // })
    };

    return of(budgetItems);
  }

  removeBudgetItems(id: number): Observable<budgetItem[]>{
    let budgetItems = [];
    const getBudgetItems = JSON.parse(localStorage.getItem('budget_items'));
    const findItemPos = getBudgetItems.findIndex((budgetItem: budgetItem) => {
      return budgetItem.id === id
    })

    getBudgetItems.splice(findItemPos, 1);
    localStorage.setItem('budget_items', JSON.stringify(getBudgetItems));
    budgetItems = JSON.parse(localStorage.getItem('budget_items'));
    return of(budgetItems);
  }

  updateBudgetItem(id: number, value: string): Observable<budgetItem[]>{
    const getBudgetItems = JSON.parse(localStorage.getItem('budget_items'));
    const findItemPos = getBudgetItems.findIndex((budgetItem: budgetItem) => {
      return budgetItem.id === id
    });
    
    getBudgetItems[findItemPos].amount = Number(value);
    
    localStorage.setItem('budget_items', JSON.stringify(getBudgetItems));
    return of(getBudgetItems);
  }
  
}