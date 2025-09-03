import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService, Account } from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <h2>Accounts Management</h2>

    <form (ngSubmit)="onSubmit()" #accountForm="ngForm" class="form-container">
      <mat-form-field appearance="outline">
        <mat-label>Account Number</mat-label>
        <input matInput [(ngModel)]="account.accountNumber" name="accountNumber" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Type</mat-label>
        <mat-select [(ngModel)]="account.type" name="type" required>
          <mat-option value="SAVINGS">Savings</mat-option>
          <mat-option value="CURRENT">Current</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Balance</mat-label>
        <input matInput type="number" [(ngModel)]="account.balance" name="balance" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Customer ID</mat-label>
        <input matInput type="number" [(ngModel)]="account.customerId" name="customerId" required />
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">
        {{ isEditing ? 'Update Account' : 'Add Account' }}
      </button>
      <button mat-raised-button color="warn" type="button" (click)="cancelEdit()" *ngIf="isEditing">
        Cancel
      </button>
    </form>

    <table mat-table [dataSource]="accounts" class="mat-elevation-z8 full-width-table">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let account"> {{ account.id }} </td>
      </ng-container>

      <ng-container matColumnDef="accountNumber">
        <th mat-header-cell *matHeaderCellDef> Account Number </th>
        <td mat-cell *matCellDef="let account"> {{ account.accountNumber }} </td>
      </ng-container>

      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef> Type </th>
        <td mat-cell *matCellDef="let account"> {{ account.type }} </td>
      </ng-container>

      <ng-container matColumnDef="balance">
        <th mat-header-cell *matHeaderCellDef> Balance </th>
        <td mat-cell *matCellDef="let account"> {{ account.balance }} </td>
      </ng-container>

      <ng-container matColumnDef="customerId">
        <th mat-header-cell *matHeaderCellDef> Customer ID </th>
        <td mat-cell *matCellDef="let account"> {{ account.customerId }} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let account">
          <button mat-button color="primary" (click)="editAccount(account)">Edit</button>
          <button mat-button color="warn" (click)="deleteAccount(account.id!)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [`
    form { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; }
    .full-width-table { width: 100%; }
  `]
})
export class AccountsComponent {
  accounts: Account[] = [];
  account: Account = { accountNumber: '', type: '', balance: 0, customerId: 0 };
  isEditing = false;
  editingId: number | null = null;

  displayedColumns: string[] = ['id', 'accountNumber', 'type', 'balance', 'customerId', 'actions'];

  constructor(private accountService: AccountService, private snackBar: MatSnackBar) {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = [...data],
      error: () => this.snackBar.open('❌ Failed to load accounts', 'Close', { duration: 3000 })
    });
  }

  onSubmit() {
    if (this.isEditing && this.editingId !== null) {
      this.accountService.updateAccount(this.editingId, this.account).subscribe({
        next: (updated) => {
          const index = this.accounts.findIndex(acc => acc.id === this.editingId);
          if (index !== -1) {
            this.accounts[index] = updated;
            this.accounts = [...this.accounts];
          }
          this.snackBar.open('✅ Account updated successfully', 'Close', { duration: 3000 });
          this.resetForm();
        },
        error: () => this.snackBar.open('❌ Error updating account', 'Close', { duration: 3000 })
      });
    } else {
      this.accountService.createAccount(this.account).subscribe({
        next: (created) => {
          this.accounts.push(created);
          this.accounts = [...this.accounts];
          this.account = { accountNumber: '', type: '', balance: 0, customerId: 0 };
          this.snackBar.open('✅ Account added successfully', 'Close', { duration: 3000 });
        },
        error: () => this.snackBar.open('❌ Error creating account', 'Close', { duration: 3000 })
      });
    }
  }

  editAccount(account: Account) {
    this.account = { ...account };
    this.isEditing = true;
    this.editingId = account.id ?? null;
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe({
      next: () => {
        this.accounts = this.accounts.filter(acc => acc.id !== id);
        this.snackBar.open('✅ Account deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('❌ Error deleting account', 'Close', { duration: 3000 })
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.account = { accountNumber: '', type: '', balance: 0, customerId: 0 };
    this.isEditing = false;
    this.editingId = null;
  }
}
