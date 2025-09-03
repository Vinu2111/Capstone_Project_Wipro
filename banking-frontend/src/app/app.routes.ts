import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { CustomersComponent } from './pages/customers/customers';
import { AccountsComponent } from './pages/accounts/accounts';
import { TransactionsComponent } from './pages/transactions/transactions';
import { Notifications } from './pages/notifications/notifications';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // ✅ default = register
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'customers', component: CustomersComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'notifications', component: Notifications },
  { path: 'reports', component: Reports },
  { path: '**', redirectTo: 'register' } // fallback
];
