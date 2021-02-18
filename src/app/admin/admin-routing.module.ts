import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Roles
import { Role } from '../model/roles';
// Guard
import { AuthGuard } from '../guard/auth.guard';
// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { CommonBasketComponent } from './common-basket/common-basket.component';
import { TelemarketingComponent } from './telemarketing/telemarketing.component';
import { ReportRoadtaxComponent } from './report-roadtax/report-roadtax.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TargetAchieverComponent } from './target-achiever/target-achiever.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CustomerDatabaseComponent } from './customer-database/customer-database.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [{ path: '', component: UserManagementComponent }],
  },
  {
    path: 'follow',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: 'urgent/ncd',
        component: CommonBasketComponent,
        data: {
          page: 'NCD',
          category: 'Follow Up',
          subCategory: 'Urgent',
        },
      },
      {
        path: 'urgent/high-risk',
        component: CommonBasketComponent,
        data: {
          category: 'Follow Up',
          subCategory: 'Urgent',
          page: 'High Risk',
        },
      },
      {
        path: 'urgent/roadtax',
        component: CommonBasketComponent,
        data: { category: 'Follow Up', subCategory: 'Urgent', page: 'Roadtax' },
      },
      {
        path: 'assist/ncd',
        component: CommonBasketComponent,
        data: {
          page: 'NCD',
          category: 'Follow Up',
          subCategory: 'Assist',
        },
      },
      {
        path: 'assist/market-value',
        component: CommonBasketComponent,
        data: {
          page: 'Market Value',
          category: 'Follow Up',
          subCategory: 'Assist',
        },
      },
    ],
  },
  {
    path: 'endorsement',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: 'urgent/ncd',
        component: CommonBasketComponent,
        data: {
          page: 'NCD',
          category: 'Endorsement',
          subCategory: 'Urgent',
        },
      },
      {
        path: 'urgent/high-risk',
        component: CommonBasketComponent,
        data: {
          category: 'Endorsement',
          subCategory: 'Urgent',
          page: 'High Risk',
        },
      },
      {
        path: 'urgent/roadtax',
        component: CommonBasketComponent,
        data: {
          category: 'Endorsement',
          subCategory: 'Urgent',
          page: 'Roadtax',
        },
      },
      {
        path: 'assist/ncd',
        component: CommonBasketComponent,
        data: {
          page: 'NCD',
          category: 'Endorsement',
          subCategory: 'Assist',
        },
      },
      {
        path: 'assist/market-value',
        component: CommonBasketComponent,
        data: {
          page: 'Market Value',
          category: 'Endorsement',
          subCategory: 'Assist',
        },
      },
      {
        path: 'payment-fail',
        component: CommonBasketComponent,
        data: {
          page: 'Payment Failed',
          category: 'Endorsement',
        },
      },
    ],
  },
  {
    path: 'claim',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: 'windscreen',
        component: CommonBasketComponent,
        data: {
          page: 'Claim Windscreen',
          category: 'Claim',
        },
      },
    ],
  },
  {
    path: 'refund',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: '',
        component: CommonBasketComponent,
        data: {
          page: 'Refund',
        },
      },
    ],
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: 'template',
        component: NotificationComponent,
        data: {
          page: 'Template',
          category: 'Notification',
        },
      },
      {
        path: 'schedule',
        component: NotificationComponent,
        data: {
          page: 'Schedule',
          category: 'Notification',
        },
      },
    ],
  },
  {
    path: 'telemarketing',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Supervisor, Role.Telemarketing] },
    children: [
      {
        path: '',
        component: TelemarketingComponent,
        data: {
          page: 'Telemarketing',
        },
      },
    ],
  },
  {
    path: 'report',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: 'roadtax',
        component: ReportRoadtaxComponent,
        data: {
          page: 'Roadtax',
          category: 'Report',
        },
      },
    ],
  },
  {
    path: 'customer-database',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: '',
        component: CustomerDatabaseComponent,
        data: {
          page: 'Database',
        },
      },
    ],
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: '',
        component: AccountSettingsComponent,
      },
    ],
  },
  {
    path: 'target-achievement',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { roles: [Role.Administrator, Role.Telemarketing] },
    children: [
      {
        path: '',
        component: TargetAchieverComponent,
      },
    ],
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
  CommonBasketComponent,
  NotificationComponent,
  TelemarketingComponent,
  ReportRoadtaxComponent,
  TargetAchieverComponent,
  UserManagementComponent,
  AccountSettingsComponent,
  CustomerDatabaseComponent,
];
