import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SettingsService} from '../../shared/services/settings.service';
import {ITransaction} from '../models/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient,
              private settings: SettingsService) {}

  get transactionsApi(): string {
    return this.settings.apiHost + 'account/transactions/';
  }

  addTransaction(task) {
    return this.http.post<{ message: string; result: ITransaction }>(this.transactionsApi, task);
  }

  getTransactions(created_at_lte= null, created_at_gte= null) {
    const params = new HttpParams();
    params.set('created_at_lte', created_at_lte);
    params.set('created_at_gte', created_at_gte);

    return this.http.get<{ message: string; result: ITransaction[] }>(this.transactionsApi, {params: params});
  }

  // TODO Handle updates and deletes
  updateTransactions(update) {
    return this.http.put<{ message: string; result: ITransaction }>(this.transactionsApi, update);
  }

  deleteTransaction(transaction_id: string) {
    return this.http.delete<{ message: string; result: ITransaction[] }>(`${this.transactionsApi}${transaction_id}/`);
  }
}
