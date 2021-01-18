import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonBasketComponent } from './common-basket/common-basket.component';
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
          page: 'Fail',
          category: 'Endorsement',
          subCategory: 'Payment',
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
          page: 'Windscreen',
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
  UserManagementComponent,
];
