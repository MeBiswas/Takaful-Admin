import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Toaster
import { ToastrModule } from 'ngx-toastr';
// Guard
import { AuthGuard } from './guard/auth.guard';
// Root Component
import { AppComponent } from './app.component';
// HTTP Request
import { HttpClientModule } from '@angular/common/http';
// Auth Service
import { AuthService } from './services/auth/auth.service';
// Routing
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
// Animation Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NGRX
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  declarations: [AppComponent, RoutingComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
