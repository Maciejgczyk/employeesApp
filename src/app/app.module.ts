import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeesContainerComponent } from './components/employees-container/employees-container.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/modules/material.module';
import { AddEmployeeComponent } from './components/dialogs/add-employee/add-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './components/companies/companies.component';
import { HeaderRoutingModule } from './components/header/header-routing.module';
import { AddCompanyComponent } from './components/companies/add-company/add-company.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { CompanyCardComponent } from './components/companies/company-card/company-card.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    EmployeesContainerComponent,
    EmployeeCardComponent,
    AddEmployeeComponent,
    CompaniesComponent,
    AddCompanyComponent,
    ConfirmationComponent,
    CompanyCardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HeaderRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
