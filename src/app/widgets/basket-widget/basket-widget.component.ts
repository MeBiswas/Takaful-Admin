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
  selector: 'app-basket-widget',
  templateUrl: './basket-widget.component.html',
  styleUrls: ['./basket-widget.component.css'],
})
export class BasketWidgetComponent implements OnInit {
  @Input() _filter: string;
  basketStatisticsUrl = '/admin/dashboard/basketstatistic';

  basketStatisticsResponseData = {
    list: [],
  };

  constructor(
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // LifeCycle Method
  ngOnChanges() {
    this.onFilterValueChange(this._filter);
  }

  // Filteration Handler
  onFilterValueChange(value) {
    let data = { filter: value };
    this.getBasketStatistics(data);
  }

  // Service Handler
  getBasketStatistics(data) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.basketStatisticsUrl, data)
      .subscribe((res) => {
        if (res.status.code === 0) {
          this.basketStatisticsResponseData = { ...res };
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
      });
  }
}
