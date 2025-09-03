import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div style="display:flex; justify-content:center; align-items:center; height:100vh;
                background:url('https://images.unsplash.com/photo-1567427013953-42c5f57d3f10?auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
                position:relative;">
      
      <div style="position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(37,99,235,0.7);"></div>

      <mat-card style="width:450px; padding:35px; border-radius:20px; text-align:center;
                       box-shadow:0 8px 20px rgba(0,0,0,0.3); position:relative; z-index:10; background:white;">
        <mat-icon style="font-size:50px; color:#2563eb;">person_add</mat-icon>
        <h2 style="color:#1e3a8a; font-weight:700; margin:10px 0;">Create Your Banking Account</h2>
        <p style="font-size:14px; color:#6b7280;">Fill in your details to get started</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" style="margin-top:20px; display:flex; flex-direction:column; gap:20px;">
          <mat-form-field appearance="outline">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" type="text" placeholder="e.g. vinayak" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="you@example.com" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password" placeholder="••••••••" />
          </mat-form-field>

          <button mat-raised-button color="primary" style="border-radius:10px;" [disabled]="form.invalid">
            <mat-icon>person_add</mat-icon> Register
          </button>
        </form>

        <p style="margin-top:20px; font-size:14px;">
          Already have an account?
          <a routerLink="/login" style="color:#2563eb; font-weight:600; text-decoration:none;">Login here</a>
        </p>
      </mat-card>
    </div>
  `
})
export class Register {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.register({
        username: this.form.value.username,
        password: this.form.value.password,
        email: this.form.value.email
      }).subscribe({
        next: () => {
          alert('Registration Successful ✅');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Backend error:', err.error);
          alert('Registration Failed ❌');
        }
      });
    }
  }
}
