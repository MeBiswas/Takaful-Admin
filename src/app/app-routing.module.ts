import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './auth/login/login.component';
import { InvalidComponent } from './auth/invalid/invalid.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'invalid', component: InvalidComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent, InvalidComponent, ForgotPasswordComponent]
