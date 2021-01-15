import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Forms Module
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule, RoutingComponents } from './auth-routing.module';

@NgModule({
  declarations: [RoutingComponents],
  imports: [CommonModule, FormsModule, AuthRoutingModule],
})
export class AuthModule {}
