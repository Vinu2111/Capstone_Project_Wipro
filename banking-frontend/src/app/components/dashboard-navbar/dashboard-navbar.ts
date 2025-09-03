import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" style="display:flex; justify-content:space-between;">
      <span style="font-weight:700; font-size:18px;">🏦 Banking App</span>

      <div style="display:flex; gap:15px; align-items:center;">
        <span style="font-size:14px; font-weight:500;">Welcome, User</span>
        <button mat-raised-button color="warn" (click)="logout()">Logout</button>
      </div>
    </mat-toolbar>
  `
})
export class DashboardNavbar {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('jwtToken'); // clear token
    this.router.navigate(['/login']);    // redirect to login
  }
}
