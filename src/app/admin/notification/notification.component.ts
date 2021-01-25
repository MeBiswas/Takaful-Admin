import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Material Table Dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// Service
import { AdminService } from '../../services/admin/admin.service';

// Select Option Interface
interface Filter {
  value: string;
  option: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  search = '';
  listData: any = [];
  filter = 'Monthly';
  dataSource = new MatTableDataSource();
  notificationURL = '/admin/notification';
  userID = JSON.parse(sessionStorage.getItem('auth')).userId;

  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

  displayedColumns: string[] = [
    'check',
    'carRegister',
    'customerName',
    'phoneNumber',
    'email',
    'message',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.notificationRequest(this.userID, this.filter);
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Achiever List Service
  private notificationRequest(u, f) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.notificationURL, {
        userId: u,
        filter: f,
      })
      .subscribe(
        (res) => {
          res ? this._spin.hide() : null;
          this.addCheckboxData(res.list);
        },
        (err) => {
          err ? this._spin.hide() : null;
          this._toast.error('Oops! Something went wrong.');
        }
      );
  }

  // Adding Checkbox Column Data
  private addCheckboxData(d) {
    let newArr = [...d];
    this.listData = newArr.map((item) => (item = { ...item, check: false }));
    this.dataSource.data = this.listData;
  }

  // Pagination Event
  pageChanged(e) {
    // do something
  }

  // Filter Table with Search Input
  searchFor(s: string) {
    this.dataSource.filter = s.trim().toLocaleLowerCase();
  }

  // Filter Event
  onFilterChanged(e) {
    this.notificationRequest(this.userID, e);
  }

  clickHandler(e) {
    e.check = !e.check;
    let i = this.dataSource.data.indexOf(e);
    this.dataSource.data[i] = e;
  }
}
