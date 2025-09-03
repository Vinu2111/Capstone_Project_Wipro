import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { PaymentService, Payment } from '../../services/payment.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  template: `
    <h2>Payments</h2>

    <!-- Payment Form -->
    <form (ngSubmit)="onSubmit()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>Account ID</mat-label>
        <input matInput type="number" [(ngModel)]="payment.accountId" name="accountId" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input matInput type="number" [(ngModel)]="payment.amount" name="amount" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Method</mat-label>
        <mat-select [(ngModel)]="payment.method" name="method" required>
          <mat-option value="UPI">UPI</mat-option>
          <mat-option value="CARD">Card</mat-option>
          <mat-option value="NETBANKING">Net Banking</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="payment.description" name="description" />
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Make Payment</button>
    </form>

    <!-- Payment History Table -->
    <table mat-table [dataSource]="payments" class="mat-elevation-z8 full-width-table">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.id }} </td>
      </ng-container>

      <ng-container matColumnDef="accountId">
        <th mat-header-cell *matHeaderCellDef> Account ID </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.accountId }} </td>
      </ng-container>

      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef> Amount </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.amount }} </td>
      </ng-container>

      <ng-container matColumnDef="method">
        <th mat-header-cell *matHeaderCellDef> Method </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.method }} </td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.status }} </td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.description }} </td>
      </ng-container>

      <ng-container matColumnDef="timestamp">
        <th mat-header-cell *matHeaderCellDef> Timestamp </th>
        <td mat-cell *matCellDef="let pay"> {{ pay.timestamp }} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [`
    .form-container { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
    .full-width-table { width: 100%; margin-top: 2rem; }
  `]
})
export class PaymentsComponent {
  payments: Payment[] = [];
  payment: Payment = { accountId: 0, amount: 0, method: '', description: '' };

  displayedColumns: string[] = ['id', 'accountId', 'amount', 'method', 'status', 'description', 'timestamp'];

  constructor(private paymentService: PaymentService, private snackBar: MatSnackBar) {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getAllPayments().subscribe({
      next: (data: Payment[]) => this.payments = [...data],
      error: () => this.snackBar.open('❌ Failed to load payments', 'Close', { duration: 3000 })
    });
  }

  onSubmit() {
    this.paymentService.makePayment(this.payment).subscribe({
      next: (created: Payment) => {
        this.payments.push(created);
        this.payments = [...this.payments];
        this.snackBar.open('✅ Payment successful', 'Close', { duration: 3000 });
        this.payment = { accountId: 0, amount: 0, method: '', description: '' };
      },
      error: () => this.snackBar.open('❌ Payment failed', 'Close', { duration: 3000 })
    });
  }
}
