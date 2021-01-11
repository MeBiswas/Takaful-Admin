import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing Module
import { AdminRoutingModule, RoutingComponents } from './admin-routing.module';
// Forms Module
import { FormsModule } from '@angular/forms';
// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// Material
import { MatTableModule } from '@angular/material/table';
// Header Component
import { HeaderComponent } from '../shared/header/header.component';
// Sidebar Component
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
// Widgets
import { SaleWidgetComponent } from '../widgets/sale-widget/sale-widget.component';
import { NoteWidgetComponent } from '../widgets/note-widget/note-widget.component';
import { IssueWidgetComponent } from '../widgets/issue-widget/issue-widget.component';
import { QuoteWidgetComponent } from '../widgets/quote-widget/quote-widget.component';
import { BasketWidgetComponent } from '../widgets/basket-widget/basket-widget.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    RoutingComponents,
    SaleWidgetComponent,
    NoteWidgetComponent,
    IssueWidgetComponent,
    QuoteWidgetComponent,
    BasketWidgetComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    NgxSpinnerModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
