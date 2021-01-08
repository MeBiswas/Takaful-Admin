import { Component, OnInit } from '@angular/core';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-widget',
  templateUrl: './quote-widget.component.html',
  styleUrls: ['./quote-widget.component.css'],
})
export class QuoteWidgetComponent implements OnInit {
  totalQuotationResponseData = {
    total: null,
  };

  quoteStatisticsUrl = '/admin/dashboard/totalquotation';

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.getQuoteStatistics();
  }

  getQuoteStatistics() {
    this._spin.show();
    this._admin.getApiWithAuth(this.quoteStatisticsUrl).subscribe(
      (res) => {
        this.totalQuotationResponseData = {
          ...this.totalQuotationResponseData,
          ...res,
        };
        console.log('Response in Quote Statistic Service', res);
      },
      (err) => {
        console.log('Error in Quote Statistic Service', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this._spin.hide();
  }
}
