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
  notificationURL: string;
  dataSource = new MatTableDataSource();
  userID = JSON.parse(sessionStorage.getItem('auth')).userId;

  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

  displayedColumns: string[] = ['template', 'message', 'type', 'templateId'];

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
    this.notificationRequest();
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
    this.routeData.page === 'Template'
      ? (this.notificationURL = '/admin/templatelist')
      : (this.notificationURL = '/admin/schedulelist');
  }

  // Achiever List Service
  private notificationRequest() {
    this._spin.show();
    this._admin.getApiWithAuth(this.notificationURL).subscribe(
      (res) => {
        res ? this._spin.hide() : null;
        this.addTableColumnData(res.list);
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }

  // Adding Checkbox Column Data
  private addTableColumnData(d) {
    let newArr = [...d];
    this.listData = newArr.map((item) => (item = { ...item }));
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
    this.notificationRequest();
  }
}
