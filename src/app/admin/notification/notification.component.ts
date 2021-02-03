import { Component, OnInit, ViewChild } from '@angular/core';
// Router
import { Router } from '@angular/router';
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
// Animations
import {
  state,
  style,
  animate,
  trigger,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  routeData;
  search = '';
  listData: any = [];
  filter = 'Monthly';
  notificationURL: string;
  detailComponentData = '';
  deleteTableDataURL: string;
  dataSource = new MatTableDataSource();
  userID = JSON.parse(sessionStorage.getItem('auth')).userId;

  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

  displayedColumns: string[] = ['template', 'message', 'type', 'templateId'];

  constructor(
    private _router: Router,
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
      ? ((this.notificationURL = '/admin/templatelist'),
        (this.deleteTableDataURL = '/admin/deletetemplate'))
      : ((this.notificationURL = '/admin/schedulelist'),
        (this.deleteTableDataURL = '/admin/deleteschedule'));
  }

  // Achiever List Service
  private notificationRequest() {
    this._spin.show();
    this._admin.getApiWithAuth(this.notificationURL).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this.addTableColumnData(res.list);
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

  // Delete Service Handler
  deleteHandler(d) {
    this._spin.show();
    this._admin.deleteApiWithAuth(this.deleteTableDataURL, d).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
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

  // Adding Checkbox Column Data
  private addTableColumnData(d) {
    let newArr = [...d];
    this.listData = newArr.map((item) => (item = { ...item, action: item }));
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

  // On Table Expand Event
  onTableExpand(d) {
    this.detailComponentData = d;
  }
}
