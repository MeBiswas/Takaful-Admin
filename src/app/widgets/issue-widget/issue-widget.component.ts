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
  selector: 'app-issue-widget',
  templateUrl: './issue-widget.component.html',
  styleUrls: ['./issue-widget.component.css'],
})
export class IssueWidgetComponent implements OnInit {
  today: number = Date.now();

  recentIssuesResponseData = {
    recentList: [],
  };

  mostRecentIssuesUrl = '/admin/dashboard/recentissues';

  mostRecentIssuesData = {
    date: '',
  };

  constructor(
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getMostRecentIssues();
  }

  getDateFormat() {
    let months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    let d = new Date();
    let dt = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    let m = d.getMonth();
    let y = d.getFullYear();
    let date = `${y}-${months[m]}-${dt}`;
    return date;
  }

  getMostRecentIssues() {
    this._spin.show();
    this.mostRecentIssuesData.date = this.getDateFormat();
    this._admin
      .postApiWithAuth(this.mostRecentIssuesUrl, this.mostRecentIssuesData)
      .subscribe(
        (res) => {
          if (res.status.code === 0) {
            this.recentIssuesResponseData = {
              ...this.recentIssuesResponseData,
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
