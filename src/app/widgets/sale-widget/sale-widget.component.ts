import { Component, OnInit } from '@angular/core';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

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
        this.saleStatisticResponseData = {
          ...this.saleStatisticResponseData,
          ...res,
        };
        console.log('Response in Sale Statistic Service', res);
      },
      (err) => {
        // console.log('Error in Sale Statistic Service', err);
        this._toast.error(err.status.message);
      }
    );
    this._spin.hide();
  }
}
