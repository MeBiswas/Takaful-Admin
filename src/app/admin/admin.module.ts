import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
import { MaterialModule } from '../material';
// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// Summernote Editor Module
import { NgxSummernoteModule } from 'ngx-summernote';
// Forms Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Header Component
import { HeaderComponent } from '../shared/header/header.component';
// Sidebar Component
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
// Routing Module
import { AdminRoutingModule, RoutingComponents } from './admin-routing.module';
// Dialog
import { SmsComponent } from '../shared/dialog/sms/sms.component';
import { CallComponent } from '../shared/dialog/call/call.component';
import { EmailComponent } from '../shared/dialog/email/email.component';
import { AddUserComponent } from '../shared/dialog/add-user/add-user.component';
import { EditUserComponent } from '../shared/dialog/edit-user/edit-user.component';
import { DeleteUserComponent } from '../shared/dialog/delete-user/delete-user.component';
import { AddTemplateComponent } from '../shared/dialog/add-template/add-template.component';
import { AddScheduleComponent } from '../shared/dialog/add-schedule/add-schedule.component';
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
import { WindscreenComponent } from '../basket-details/windscreen/windscreen.component';
import { UrgentRiskComponent } from '../basket-details/urgent-risk/urgent-risk.component';
import { AssistMarketComponent } from '../basket-details/assist-market/assist-market.component';
import { NotificationTemplateComponent } from '../basket-details/notification-template/notification-template.component';
import { NotificationScheduleComponent } from '../basket-details/notification-schedule/notification-schedule.component';

@NgModule({
  declarations: [
    SmsComponent,
    CallComponent,
    EmailComponent,
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
    WindscreenComponent,
    UrgentRiskComponent,
    IssueWidgetComponent,
    QuoteWidgetComponent,
    AddTemplateComponent,
    AddScheduleComponent,
    AssistMarketComponent,
    BasketWidgetComponent,
    NotificationTemplateComponent,
    NotificationScheduleComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    NgxSpinnerModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
  ],
})
export class AdminModule {}
