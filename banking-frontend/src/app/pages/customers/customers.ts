import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <mat-card class="p-4">
      <mat-toolbar color="primary">Customer Management</mat-toolbar>

      <form (ngSubmit)="saveCustomer()" #customerForm="ngForm" class="form-container">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="newCustomer.name" name="name" required />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="newCustomer.email" name="email" required />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Phone</mat-label>
          <input matInput [(ngModel)]="newCustomer.phone" name="phone" required />
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">
          {{ editing ? 'Update Customer' : 'Add Customer' }}
        </button>
        <button *ngIf="editing" mat-raised-button color="warn" type="button" (click)="cancelEdit()">
          Cancel
        </button>
      </form>

      <table mat-table [dataSource]="customers" class="mat-elevation-z8 w-full mt-4">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let customer"> {{customer.id}} </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let customer"> {{customer.name}} </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let customer"> {{customer.email}} </td>
        </ng-container>

        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef> Phone </th>
          <td mat-cell *matCellDef="let customer"> {{customer.phone}} </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let customer">
            <button mat-button color="accent" (click)="editCustomer(customer)">Edit</button>
            <button mat-button color="warn" (click)="deleteCustomer(customer.id!)">Delete</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </mat-card>
  `,
  styles: [`
    mat-card { margin: 20px; }
    .form-container { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
    table { width: 100%; }
  `]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];

  newCustomer: Customer = { name: '', email: '', phone: '' };
  editing = false;
  editId: number | null = null;

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = [...data],
      error: () => this.snackBar.open('❌ Failed to load customers', 'Close', { duration: 3000 })
    });
  }

  saveCustomer(): void {
    if (this.editing && this.editId !== null) {
      this.customerService.updateCustomer(this.editId, this.newCustomer).subscribe({
        next: (updated) => {
          const index = this.customers.findIndex(c => c.id === this.editId);
          if (index !== -1) {
            this.customers[index] = updated;
            this.customers = [...this.customers];
          }
          this.snackBar.open('✅ Customer updated successfully', 'Close', { duration: 3000 });
          this.cancelEdit();
        },
        error: () => this.snackBar.open('❌ Error updating customer', 'Close', { duration: 3000 })
      });
    } else {
      this.customerService.createCustomer(this.newCustomer).subscribe({
        next: (created) => {
          this.customers.push(created);
          this.customers = [...this.customers];
          this.newCustomer = { name: '', email: '', phone: '' };
          this.snackBar.open('✅ Customer added successfully', 'Close', { duration: 3000 });
        },
        error: () => this.snackBar.open('❌ Error adding customer', 'Close', { duration: 3000 })
      });
    }
  }

  editCustomer(customer: Customer): void {
    this.newCustomer = { ...customer };
    this.editing = true;
    this.editId = customer.id ?? null;
  }

  cancelEdit(): void {
    this.newCustomer = { name: '', email: '', phone: '' };
    this.editing = false;
    this.editId = null;
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c.id !== id);
        this.snackBar.open('✅ Customer deleted successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('❌ Error deleting customer', 'Close', { duration: 3000 })
    });
  }
}
