import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionDetailsTableComponent } from './table/admission-details-table/admission-details-table.component';
import { FgMasterTableComponent } from './table/fg-master-table/fg-master-table.component';
import { HscAcaTableComponent } from './table/hsc-aca-table/hsc-aca-table.component';
import { HscVocTableComponent } from './table/hsc-voc-table/hsc-voc-table.component';
import { Table1Component } from './table/table1/table1.component';
import { Table2Component } from './table/table2/table2.component';

const routes: Routes = [
  { path: '', component:Table1Component },
  { path: 'student_master', component:Table1Component },
  { path: 'additional_info', component:Table2Component },
  { path: 'admission_details', component:AdmissionDetailsTableComponent },
  { path: 'fg_master', component:FgMasterTableComponent },
  { path: 'hsc_aca', component:HscAcaTableComponent },
  { path: 'hsc_voc', component:HscVocTableComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'logout', component: LogoutComponent },
  // { path: 'forgot', component: ForgotComponent },
  // {path:'',component:DashboardComponent},
  // {
  //   path: 'customers',
  //   loadChildren: () =>
  //     import('./customers/customers.module').then((m) => m.CustomersModule),
  // },
  // {
  //   path: 'payments',
  //   loadChildren: () =>
  //     import('./payments/payments.module').then((m) => m.PaymentsModule),
  // },
  // {
  //   path: 'loans',
  //   loadChildren: () =>
  //     import('./loans/loans.module').then((m) => m.LoansModule),
  // },
  // {
  //   path: 'invoices',
  //   loadChildren: () =>
  //     import('./invoices/invoices.module').then((m) => m.InvoicesModule),
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./settings/settings.module').then((m) = > m.SettingsModule),
  // },
  // { path: 'loan-types', loadChildren: () =>
  //  import('./loan-types/loan-types.module').then(m => m.LoanTypesModule) },
  // { path: 'reports', loadChildren: () =>
  // import('./reports/reports.module').then(m => m.ReportsModule) },
  // { path: 'activity', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
  // {path:'**' , component:PagenotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
