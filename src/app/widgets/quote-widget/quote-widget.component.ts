import { Component, Input, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
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
    private _router: Router,
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
        if (res.status.code === 0) {
          this.totalQuotationResponseData = {
            ...this.totalQuotationResponseData,
            ...res,
          };
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }
}
