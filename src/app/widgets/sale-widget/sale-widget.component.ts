import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-sale-widget',
  templateUrl: './sale-widget.component.html',
  styleUrls: ['./sale-widget.component.css'],
})
export class SaleWidgetComponent implements OnInit {
  saleStatisticResponseData = {
    year: null,
    month: null,
    targetValue: null,
    targetAchievement: null,
  };

  saleStatisticUrl = '/admin/dashboard/usertarget';

  constructor(
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getSaleStatistic();
  }

  getSaleStatistic() {
    this._spin.show();
    this._admin.getApiWithAuth(this.saleStatisticUrl).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this.saleStatisticResponseData = {
            ...this.saleStatisticResponseData,
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
