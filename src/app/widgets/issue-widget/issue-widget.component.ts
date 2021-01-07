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
    date: '2020-12-24',
  };

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getMostRecentIssues();
  }

  getMostRecentIssues() {
    this._spin.show();
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
          this._toast.error(err.status.message);
        }
      );
    this._spin.hide();
  }
}
