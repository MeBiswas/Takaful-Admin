import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Animation Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Forms Module
import { FormsModule } from "@angular/forms";
// HTTP Request
import { HttpClientModule } from '@angular/common/http';
// Auth Service
import { AuthService } from './services/auth/auth.service';
// Spinner
import { NgxSpinnerModule } from "ngx-spinner";
// Toaster
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
