import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Forms Module
import { FormsModule } from '@angular/forms';
// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';

import { AuthRoutingModule, RoutingComponents } from './auth-routing.module';

@NgModule({
  declarations: [RoutingComponents],
  imports: [CommonModule, FormsModule, NgxSpinnerModule, AuthRoutingModule],
})
export class AuthModule {}
