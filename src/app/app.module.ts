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
// NGRX Services
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  declarations: [AppComponent, RoutingComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects]),
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
