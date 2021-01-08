import { Component, Input, OnInit } from '@angular/core';
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
  @Input() _filter: string;

  basketStatisticsResponseData = {
    list: [],
  };

  basketStatisticsUrl = '/admin/dashboard/basketstatistic';

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getBasketStatistics({
      filter: this._filter,
    });
  }

  ngOnChanges() {
    this.onFilterValueChange(this._filter);
  }

  onFilterValueChange(value) {
    let data = { filter: value };
    this.getBasketStatistics(data);
  }

  getBasketStatistics(data) {
    this._spin.show();
    this._admin.postApiWithAuth(this.basketStatisticsUrl, data).subscribe(
      (res) => {
        this.basketStatisticsResponseData = {
          ...this.basketStatisticsResponseData,
          ...res,
        };
        console.log('Response in Basket Statistic Service', res);
      },
      (err) => {
        console.log('Error in Basket Statistic Service', err);
        this._toast.error('Oops! Something went wrong.');
      }
    );
    this._spin.hide();
  }
}
