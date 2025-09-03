import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav style="width:100%; padding:12px 24px; background:linear-gradient(to right, #60a5fa, #2563eb);
                color:white; font-weight:600; display:flex; justify-content:space-between; align-items:center;">
      
      <!-- Branding -->
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:22px;">🏦</span>
        <span style="font-size:20px;">Banking App</span>
      </div>

      <!-- Links -->
      <div style="display:flex; gap:20px; align-items:center;">
        <a routerLink="/dashboard" routerLinkActive="active-link" style="color:white; text-decoration:none;">Dashboard</a>
        <a routerLink="/customers" routerLinkActive="active-link" style="color:white; text-decoration:none;">Customers</a>
        <a routerLink="/accounts" routerLinkActive="active-link" style="color:white; text-decoration:none;">Accounts</a>
        <a routerLink="/transactions" routerLinkActive="active-link" style="color:white; text-decoration:none;">Transactions</a>
        <a routerLink="/notifications" routerLinkActive="active-link" style="color:white; text-decoration:none;">Notifications</a>
        <a routerLink="/reports" routerLinkActive="active-link" style="color:white; text-decoration:none;">Reports</a>
        <button (click)="logout()" style="background:none; border:none; color:white; font-weight:600; cursor:pointer;">Logout</button>
      </div>
    </nav>
  `,
  styles: [`
    .active-link {
      border-bottom: 2px solid white;
      padding-bottom: 2px;
    }
  `]
})
export class Navbar {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
