import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing Module
import { AdminRoutingModule, RoutingComponents } from './admin-routing.module';
// Forms Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
// Header Component
import { HeaderComponent } from '../shared/header/header.component';
// Sidebar Component
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
// Dialog
import { AddUserComponent } from '../shared/dialog/add-user/add-user.component';
import { EditUserComponent } from '../shared/dialog/edit-user/edit-user.component';
import { DeleteUserComponent } from '../shared/dialog/delete-user/delete-user.component';
// Widgets
import { SaleWidgetComponent } from '../widgets/sale-widget/sale-widget.component';
import { NoteWidgetComponent } from '../widgets/note-widget/note-widget.component';
import { IssueWidgetComponent } from '../widgets/issue-widget/issue-widget.component';
import { QuoteWidgetComponent } from '../widgets/quote-widget/quote-widget.component';
import { BasketWidgetComponent } from '../widgets/basket-widget/basket-widget.component';
// Basket Detail Components
import { MarketingComponent } from '../basket-details/marketing/marketing.component';
import { UrgentNcdComponent } from '../basket-details/urgent-ncd/urgent-ncd.component';
import { AssistNcdComponent } from '../basket-details/assist-ncd/assist-ncd.component';
import { UrgentTaxComponent } from '../basket-details/urgent-tax/urgent-tax.component';
import { UrgentRiskComponent } from '../basket-details/urgent-risk/urgent-risk.component';
import { AssistMarketComponent } from '../basket-details/assist-market/assist-market.component';
import { PaymentFailedComponent } from '../basket-details/payment-failed/payment-failed.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AddUserComponent,
    EditUserComponent,
    RoutingComponents,
    UrgentNcdComponent,
    UrgentTaxComponent,
    AssistNcdComponent,
    MarketingComponent,
    DeleteUserComponent,
    SaleWidgetComponent,
    NoteWidgetComponent,
    UrgentRiskComponent,
    IssueWidgetComponent,
    QuoteWidgetComponent,
    AssistMarketComponent,
    BasketWidgetComponent,
    PaymentFailedComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    NgxSpinnerModule,
    AdminRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AdminModule {}
