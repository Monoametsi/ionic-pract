import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { budgetItem } from '../shared/budget-item';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = "http://localhost:3000/budgetItems";

  constructor(private http: HttpClient) { }

  addBudget(budget_item:budgetItem): Observable<budgetItem>{
    return this.http.post<budgetItem>(this.apiUrl, budget_item);
  }

  getBudgetItems(): Observable<budgetItem[]>{
    return this.http.get<budgetItem[]>(this.apiUrl);
  }

  removeBudgetItems(id: number): Observable<budgetItem>{
    return this.http.delete<budgetItem>(`${this.apiUrl}/${id}`);
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