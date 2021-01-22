import { Component, Input, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Service
import { AdminService } from '../../services/admin/admin.service';

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

  ngOnInit(): void {}

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
        res ? this._spin.hide() : null;
        this.basketStatisticsResponseData = { ...res };
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }
}
