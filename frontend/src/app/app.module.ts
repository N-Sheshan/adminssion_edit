import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { Table1Component } from './table/table1/table1.component';

// 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Table2Component } from './table/table2/table2.component';
import { AdmissionDetailsTableComponent } from './table/admission-details-table/admission-details-table.component';
import { FgMasterTableComponent } from './table/fg-master-table/fg-master-table.component';
import { HscAcaTableComponent } from './table/hsc-aca-table/hsc-aca-table.component';
import { HscVocTableComponent } from './table/hsc-voc-table/hsc-voc-table.component';
import { LoginComponent } from './login/login.component';

// 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    Table1Component,
    Table2Component,
    AdmissionDetailsTableComponent,
    FgMasterTableComponent,
    HscAcaTableComponent,
    HscVocTableComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // DataTablesModule,
    BrowserAnimationsModule,ReactiveFormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
