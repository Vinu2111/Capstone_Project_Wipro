import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  template: `
    <div style="padding:30px; background:#f8fafc; min-height:100vh;">
      <h1 style="font-size:24px; font-weight:700; color:#1e3a8a; margin-bottom:20px;">
        📊 Reports & Analytics
      </h1>

      <!-- Account Types Distribution -->
      <mat-card style="padding:20px; margin-bottom:20px; border-radius:12px;">
        <h2 style="font-size:20px; font-weight:600; margin-bottom:15px;">Account Types Distribution</h2>
        <canvas baseChart 
          [data]="accountTypeData" 
          [type]="pieChartType">
        </canvas>
      </mat-card>

      <!-- Monthly Transactions -->
      <mat-card style="padding:20px; border-radius:12px;">
        <h2 style="font-size:20px; font-weight:600; margin-bottom:15px;">Monthly Transactions</h2>
        <canvas baseChart 
          [data]="txnChartData" 
          [options]="chartOptions"
          [type]="barChartType">
        </canvas>
      </mat-card>
    </div>
  `
})
export class Reports {
  // Pie Chart
  pieChartType: ChartType = 'pie';
  accountTypeData: ChartConfiguration['data'] = {
    labels: ['Savings', 'Current', 'Loan'],
    datasets: [
      { data: [60, 30, 10], backgroundColor: ['#3b82f6', '#10b981', '#f43f5e'] }
    ]
  };

  // Bar Chart
  barChartType: ChartType = 'bar';
  txnChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Credits', data: [5000, 8000, 6000, 9000, 7500, 9500], backgroundColor: '#10b981' },
      { label: 'Debits', data: [4000, 7000, 5000, 8500, 6000, 9000], backgroundColor: '#f43f5e' }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };
}
