import { Component, Input, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Service
import { AdminService } from '../../services/admin/admin.service';

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
        res ? this._spin.hide() : null;
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }
}
