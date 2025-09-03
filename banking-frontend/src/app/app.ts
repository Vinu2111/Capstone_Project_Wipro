import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar],
  template: `
    <app-navbar *ngIf="showNavbar()"></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class App {
  constructor(private router: Router) {}

  showNavbar(): boolean {
    // Hide navbar on login & register pages
    return !(this.router.url.includes('login') || this.router.url.includes('register'));
  }
}
