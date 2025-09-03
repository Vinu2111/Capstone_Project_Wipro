import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
  id?: number;
  accountId: number;
  amount: number;
  method: string;   // UPI, CARD, NETBANKING
  status?: string;  // SUCCESS, FAILED, PENDING
  description?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080/payments';

  constructor(private http: HttpClient) {}

  makePayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.baseUrl, payment);
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`);
  }
}
