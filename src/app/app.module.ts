import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Animation Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Forms Module
import { FormsModule } from '@angular/forms';
// HTTP Request
import { HttpClientModule } from '@angular/common/http';
// Auth Service
import { AuthService } from './services/auth/auth.service';
// Spinner
import { NgxSpinnerModule } from 'ngx-spinner';
// Toaster
import { ToastrModule } from 'ngx-toastr';
// Routing
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
// Root Component
import { AppComponent } from './app.component';
// Header
import { HeaderComponent } from './shared/header/header.component';
// Left Sidebar
import { SidebarComponent } from './shared/sidebar/sidebar.component';
// Custom Pipes
import { NullPipe } from './pipes/null.pipe';
// Widgets
import { SaleWidgetComponent } from './widgets/sale-widget/sale-widget.component';
import { NoteWidgetComponent } from './widgets/note-widget/note-widget.component';
import { IssueWidgetComponent } from './widgets/issue-widget/issue-widget.component';
import { QuoteWidgetComponent } from './widgets/quote-widget/quote-widget.component';
import { BasketWidgetComponent } from './widgets/basket-widget/basket-widget.component';
// Modals
import { ModalModule } from './_modal';

@NgModule({
  declarations: [
    NullPipe,
    AppComponent,
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
    ModalModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
