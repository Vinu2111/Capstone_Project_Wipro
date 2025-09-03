import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <!-- Navbar -->
    <nav style="height:60px; background:#1e3a8a; color:white; display:flex; align-items:center; justify-content:space-between; padding:0 30px; position:sticky; top:0; z-index:100;">
      <div style="display:flex; align-items:center; gap:10px; font-weight:700; font-size:20px;">
        <mat-icon>account_balance</mat-icon>
        MyBank
      </div>
      <div style="display:flex; gap:15px;">
        <a routerLink="/dashboard" style="color:white; text-decoration:none; font-weight:600;">Dashboard</a>
        <a routerLink="/login" style="color:white; text-decoration:none; font-weight:600;">Login</a>
        <a routerLink="/register" style="color:white; text-decoration:none; font-weight:600;">Register</a>
        <button mat-icon-button (click)="logout()" style="color:white;">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </nav>

    <!-- Dashboard Content -->
    <div style="min-height:calc(100vh - 60px);
                background:url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
                background-attachment:fixed; padding:40px;">
      
      <h1 style="color:#1e3a8a; text-align:center; font-size:32px; font-weight:800; margin-bottom:30px;">
        Welcome to Your Dashboard 👋
      </h1>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
        
        <!-- Account Balance -->
        <mat-card class="bank-card">
          <h2>Account Balance</h2>
          <p class="amount">₹ 75,250.00</p>
          <p class="note">Updated just now</p>
        </mat-card>

        <!-- Transactions -->
        <mat-card class="bank-card">
          <h2>Recent Transactions</h2>
          <ul>
            <li>✔️ Grocery Store – <span style="color:red;">- ₹ 1,200</span></li>
            <li>✔️ Salary Credit – <span style="color:green;">+ ₹ 45,000</span></li>
            <li>✔️ Electricity Bill – <span style="color:red;">- ₹ 2,500</span></li>
          </ul>
        </mat-card>

        <!-- Quick Actions -->
        <mat-card class="bank-card" style="text-align:center;">
          <h2>Quick Actions</h2>
          <button mat-raised-button color="primary" style="margin:5px; border-radius:10px; width:100%;">
            <mat-icon>send</mat-icon> Transfer Money
          </button>
          <button mat-raised-button color="accent" style="margin:5px; border-radius:10px; width:100%;">
            <mat-icon>person_add</mat-icon> Add Customer
          </button>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .bank-card {
      padding:24px;
      border-radius:20px;
      background:white;
      box-shadow:0 6px 18px rgba(0,0,0,0.15);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .bank-card:hover {
      transform: translateY(-5px);
      box-shadow:0 10px 25px rgba(0,0,0,0.2);
    }
    h2 {
      font-size:20px;
      font-weight:700;
      color:#1e3a8a;
      margin-bottom:15px;
    }
    .amount {
      font-size:28px;
      font-weight:800;
      color:#16a34a;
    }
    .note {
      font-size:14px;
      color:#6b7280;
    }
  `]
})
export class Dashboard {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
