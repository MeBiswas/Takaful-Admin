import { Component, OnInit } from '@angular/core';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

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
          this.recentIssuesResponseData = {
            ...this.recentIssuesResponseData,
            ...res,
          };
          console.log(
            'Response in Most Recent Issues Service',
            this.recentIssuesResponseData
          );
        },
        (err) => {
          console.log('Error in Most Recent Issues Service', err);
          this._toast.error('Oops! Something went wrong.');
        }
      );
    this._spin.hide();
  }
}
