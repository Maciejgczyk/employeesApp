import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './shared/modules/material.module';
import { AddBookComponent } from './components/dialogs/add-book/add-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './components/companies/clients.component';
import { HeaderRoutingModule } from './components/header/header-routing.module';
import { AddClientComponent } from './components/companies/add-client/add-client.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { ClientCardComponent } from './components/companies/client-card/client-card.component';
import { LoginComponent } from './components/login/login.component';
import {TokenInterceptor} from "./shared/token.interceptor";
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    BooksContainerComponent,
    BookCardComponent,
    AddBookComponent,
    ClientsComponent,
    AddClientComponent,
    ConfirmationComponent,
    ClientCardComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    BookDetailsComponent,
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
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
