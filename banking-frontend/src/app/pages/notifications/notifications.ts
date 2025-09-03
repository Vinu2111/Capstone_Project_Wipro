import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  template: `
    <div style="padding:30px; background:#f8fafc; min-height:100vh;">
      <h1 style="font-size:24px; font-weight:700; color:#1e3a8a; margin-bottom:20px;">
        🔔 Notifications
      </h1>

      <mat-card style="padding:20px; border-radius:12px;">
        <h2 style="font-size:20px; font-weight:600; margin-bottom:15px;">Recent Alerts</h2>

        <mat-list>
          <mat-list-item *ngFor="let note of notifications">
            <mat-icon matListIcon style="color:#2563eb;">notifications</mat-icon>
            <div matLine>{{note.message}}</div>
            <div matLine style="font-size:12px; color:gray;">{{note.date | date:'short'}}</div>
          </mat-list-item>
        </mat-list>
      </mat-card>
    </div>
  `
})
export class Notifications {
  notifications = [
    { message: '₹2000 credited to your Savings Account', date: new Date() },
    { message: '₹1500 debited for Electricity Bill Payment', date: new Date() },
    { message: 'Your FD interest of ₹500 has been credited', date: new Date() },
    { message: 'Loan EMI of ₹3000 deducted from Account', date: new Date() }
  ];
}
