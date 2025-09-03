import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <h2>Transactions</h2>

    <!-- Credit/Debit Form -->
    <form (ngSubmit)="onSubmitTransaction()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>Account ID</mat-label>
        <input matInput type="number" [(ngModel)]="transaction.accountId" name="accountId" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input matInput type="number" [(ngModel)]="transaction.amount" name="amount" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Type</mat-label>
        <input matInput [(ngModel)]="transaction.type" name="type" placeholder="CREDIT or DEBIT" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="transaction.description" name="description" />
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Submit Transaction</button>
    </form>

    <!-- Transfer Form -->
    <form (ngSubmit)="onTransfer()" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>Source Account ID</mat-label>
        <input matInput type="number" [(ngModel)]="sourceAccountId" name="sourceAccountId" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Target Account ID</mat-label>
        <input matInput type="number" [(ngModel)]="targetAccountId" name="targetAccountId" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Amount</mat-label>
        <input matInput type="number" [(ngModel)]="transferAmount" name="transferAmount" required />
      </mat-form-field>

      <button mat-raised-button color="accent" type="submit">Make Transfer</button>
    </form>

    <!-- Transaction History Table -->
    <table mat-table [dataSource]="transactions" class="mat-elevation-z8 full-width-table">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let tx"> {{ tx.id }} </td>
      </ng-container>

      <ng-container matColumnDef="accountId">
        <th mat-header-cell *matHeaderCellDef> Account ID </th>
        <td mat-cell *matCellDef="let tx"> {{ tx.accountId }} </td>
      </ng-container>

      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef> Type </th>
        <td mat-cell *matCellDef="let tx"> {{ tx.type }} </td>
      </ng-container>

      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef> Amount </th>
        <td mat-cell *matCellDef="let tx"> {{ tx.amount }} </td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let tx"> {{ tx.description }} </td>
      </ng-container>

      <ng-container matColumnDef="timestamp">
        <th mat-header-cell *matHeaderCellDef> Timestamp </th>
        <td mat-cell *matCellDef="let tx"> {{ tx.timestamp }} </td>
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
export class TransactionsComponent {
  transactions: Transaction[] = [];
  transaction: Transaction = { accountId: 0, amount: 0, type: '', description: '' };

  sourceAccountId!: number;
  targetAccountId!: number;
  transferAmount!: number;

  displayedColumns: string[] = ['id', 'accountId', 'type', 'amount', 'description', 'timestamp'];

  constructor(private transactionService: TransactionService, private snackBar: MatSnackBar) {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => this.transactions = [...data],
      error: () => this.snackBar.open('❌ Failed to load transactions', 'Close', { duration: 3000 })
    });
  }

  onSubmitTransaction() {
    this.transactionService.createTransaction(this.transaction).subscribe({
      next: (created) => {
        this.transactions.push(created);
        this.transactions = [...this.transactions];
        this.snackBar.open('✅ Transaction successful', 'Close', { duration: 3000 });
        this.transaction = { accountId: 0, amount: 0, type: '', description: '' };
      },
      error: () => this.snackBar.open('❌ Transaction failed', 'Close', { duration: 3000 })
    });
  }

  onTransfer() {
    this.transactionService.transfer(this.sourceAccountId, this.targetAccountId, this.transferAmount).subscribe({
      next: (msg) => {
        this.snackBar.open(msg, 'Close', { duration: 3000 });
        this.loadTransactions();
        this.sourceAccountId = this.targetAccountId = this.transferAmount = 0;
      },
      error: () => this.snackBar.open('❌ Transfer failed', 'Close', { duration: 3000 })
    });
  }
}
