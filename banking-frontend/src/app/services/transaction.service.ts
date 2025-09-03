import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id?: number;
  accountId: number;
  amount: number;
  type: string; // CREDIT | DEBIT
  description?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  // Create credit/debit
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  // Transfer between accounts
  transfer(sourceAccountId: number, targetAccountId: number, amount: number): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/transfer?sourceAccountId=${sourceAccountId}&targetAccountId=${targetAccountId}&amount=${amount}`,
      {},
      { responseType: 'text' }
    );
  }

  // Get all transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  // Get by account
  getByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/account/${accountId}`);
  }
}
