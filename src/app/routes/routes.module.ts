import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { AuthGuardService } from './guards/auth-guard.service';
import {ReportComponent} from '../components/report/report.component';
import {OrderComponent} from '../components/order/order.component';
import {AdminComponent} from '../components/admin/admin.component';
import {LoanComponent} from '../components/loan/loan.component';
import {SignupComponent} from '../components/signup/signup.component';

const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
      { path: 'admin', component: AdminComponent, data: { title: 'Admin' }},
      { path: 'reports', component: ReportComponent, data: { title: 'Reports' }},
      { path: 'orders', component: OrderComponent, data: { title: 'Orders' }},
      { path: 'loans', component: LoanComponent, data: { title: 'Loans' }},
    ]
  },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/signup', component: SignupComponent },
  { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutesModule { }
