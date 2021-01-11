import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdminComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'user',
    component: AdminComponent,
    children: [{ path: '', component: UserManagementComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
export const RoutingComponents = [
  AdminComponent,
  DashboardComponent,
  UserManagementComponent,
];
