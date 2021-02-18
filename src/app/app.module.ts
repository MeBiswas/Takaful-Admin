import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Pipe
import { DatePipe } from '@angular/common';
// Toaster
import { ToastrModule } from 'ngx-toastr';
// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// Guard
import { AuthGuard } from './guard/auth.guard';
// Root Component
import { AppComponent } from './app.component';
// Auth Service
import { AuthService } from './services/auth/auth.service';
// Interceptors
import { AuthInterceptor, ErrorInterceptor } from './interceptors';
// HTTP Module Services
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Routing
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
// Animation Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, RoutingComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    DatePipe,
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
