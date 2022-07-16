import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { budgetItem } from '../shared/budget-item';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = "http://localhost:5000/budgetItems";

  constructor(private http: HttpClient) { }

  addBudget(budget_item:budgetItem): Observable<budgetItem>{
    return this.http.post<budgetItem>(this.apiUrl, budget_item);
  }

  getBudgetItems(): Observable<budgetItem[]>{
    return this.http.get<budgetItem[]>(this.apiUrl);
  }cc

  removeBudgetItems(id: number): Observable<budgetItem>{
    return this.http.delete<budgetItem>(`${this.apiUrl}/${id}`);
  }
  
  updateBudgetItem(id: number, item: budgetItem): Observable<budgetItem>{
    return this.http.put<budgetItem>(`${this.apiUrl}/${id}`, item);
  }
  
}