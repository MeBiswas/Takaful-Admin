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
import { FollowUrgentNcdComponent } from '../basket-details/follow-urgent-ncd/follow-urgent-ncd.component';
import { FollowUrgentRiskComponent } from '../basket-details/follow-urgent-risk/follow-urgent-risk.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AddUserComponent,
    EditUserComponent,
    RoutingComponents,
    DeleteUserComponent,
    SaleWidgetComponent,
    NoteWidgetComponent,
    IssueWidgetComponent,
    QuoteWidgetComponent,
    BasketWidgetComponent,
    FollowUrgentNcdComponent,
    FollowUrgentRiskComponent,
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
