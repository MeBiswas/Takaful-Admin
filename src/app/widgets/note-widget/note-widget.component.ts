import { Component, OnInit } from '@angular/core';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.css'],
})
export class NoteWidgetComponent implements OnInit {
  coverNoteStatisticResponseData = {
    list: [],
  };

  coverNoteStatisticUrl = '/admin/dashboard/covernotestatistic';

  coverNoteStatisticsData = {
    filter: 'Monthly',
  };

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getCoverNoteStatistics();
  }

  getCoverNoteStatistics() {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.coverNoteStatisticUrl, this.coverNoteStatisticsData)
      .subscribe(
        (res) => {
          this.coverNoteStatisticResponseData = {
            ...this.coverNoteStatisticResponseData,
            ...res,
          };
          console.log(
            'Response in Cover Note Statistics Service',
            this.coverNoteStatisticResponseData
          );
        },
        (err) => {
          console.log('Error in Cover Note Statistics Service', err);
          this._toast.error('Oops! Something went wrong.');
        }
      );
    this._spin.hide();
  }
}
