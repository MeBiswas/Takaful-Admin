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
  selector: 'app-note-widget',
  templateUrl: './note-widget.component.html',
  styleUrls: ['./note-widget.component.css'],
})
export class NoteWidgetComponent implements OnInit {
  @Input() _filter: string;
  coverNoteStatisticUrl = '/admin/dashboard/covernotestatistic';

  coverNoteStatisticResponseData = {
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
    this.getCoverNoteStatistics(data);
  }

  // Service Handler
  getCoverNoteStatistics(data) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.coverNoteStatisticUrl, data)
      .subscribe((res) => {
        if (res.status.code === 0) {
          this.coverNoteStatisticResponseData = {
            ...this.coverNoteStatisticResponseData,
            ...res,
          };
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
