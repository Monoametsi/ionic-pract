import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { budgetItem } from '../shared/budget-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  addBudget(){
    
  }

  getBudgetItems(): Observable<budgetItem[]>{
    let budgetItems = [];
    if(localStorage.getItem('budget_items')){
      budgetItems = JSON.parse(localStorage.getItem('budget_items'));
      // this.setTotalValsTimer();
      window.addEventListener('storage', (e) => {
        budgetItems = JSON.parse(localStorage.getItem('budget_items'));
          // this.setTotalValsTimer()
      })
    }

    return of(budgetItems);
  }

  removeBudgetItems(id: number){
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
  
}
