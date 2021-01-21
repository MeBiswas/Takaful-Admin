import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    component: AdminComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'user',
    component: AdminComponent,
    children: [{ path: '', component: UserManagementComponent }],
  },
  {
    path: 'follow',
    component: AdminComponent,
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
    component: AdminComponent,
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
    component: AdminComponent,
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
    component: AdminComponent,
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
    component: AdminComponent,
    children: [
      {
        path: '',
        component: NotificationComponent,
        data: {
          page: 'Notification',
        },
      },
    ],
  },
  {
    path: 'telemarketing',
    component: AdminComponent,
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
    component: AdminComponent,
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
    component: AdminComponent,
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
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AccountSettingsComponent,
      },
    ],
  },
  {
    path: 'target-achievement',
    component: AdminComponent,
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
