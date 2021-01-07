import { Component, OnInit } from '@angular/core';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket-widget',
  templateUrl: './basket-widget.component.html',
  styleUrls: ['./basket-widget.component.css'],
})
export class BasketWidgetComponent implements OnInit {
  basketStatisticsResponseData = {
    list: [],
  };

  basketStatisticsUrl = '/admin/dashboard/basketstatistic/monthly';

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getBasketStatistics();
  }

  getBasketStatistics() {
    this._spin.show();
    this._admin.getApiWithAuth(this.basketStatisticsUrl).subscribe(
      (res) => {
        this.basketStatisticsResponseData = {
          ...this.basketStatisticsResponseData,
          ...res,
        };
        console.log('Response in Basket Statistic Service', res);
      },
      (err) => {
        // console.log('Error in Basket Statistic Service', err);
        this._toast.error(err.status.message);
      }
    );
    this._spin.hide();
  }
}
