import { Component, Input, OnInit } from '@angular/core';
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
  @Input() _filter: string;

  totalQuotationResponseData = {
    totalQuotation: null,
    totalCoverNote: null,
  };

  quoteStatisticsUrl = '/admin/dashboard/totalquotation';

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.onFilterValueChange(this._filter);
  }

  onFilterValueChange(value) {
    let data = { filter: value };
    this.getQuoteStatistics(data);
  }

  getQuoteStatistics(data) {
    this._spin.show();
    this._admin.postApiWithAuth(this.quoteStatisticsUrl, data).subscribe(
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
