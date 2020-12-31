import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Forms Module
import { FormsModule } from "@angular/forms";
// HTTP Request
import { HttpClientModule } from '@angular/common/http';
// Auth Service
import { AuthService } from './services/auth/auth.service';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
