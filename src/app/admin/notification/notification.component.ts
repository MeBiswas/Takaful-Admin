import { Component, OnInit, ViewChild } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Interface
import { Filter } from '../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Activated Route
import { ActivatedRoute } from '@angular/router';
// Material Table Dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// Service
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  routeData;
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
    private _spin: NgxSpinnerService,
    private activatedroute: ActivatedRoute
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getRouteData();
    this.notificationRequest(this.userID, this.filter);
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Getting Page Data from Route
  private getRouteData() {
    this.activatedroute.data.subscribe((data) => {
      this.routeData = { ...data };
    });
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
