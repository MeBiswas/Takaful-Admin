import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class NotificationComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  routeData;
  search = '';
  modalID: string;
  listData: any = [];
  filter = 'Monthly';
  detailComponentData = '';
  deleteTableDataURL: string;
  displayedColumns: string[];
  notificationURL: string = '';
  dataSource = new MatTableDataSource();

  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

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
    switch (this.routeData.page) {
      case 'Template':
        this.modalID = '#add_template_model';
        this.notificationURL = '/admin/templatelist';
        this.deleteTableDataURL = '/admin/deletetemplate';
        this.displayedColumns = ['template', 'message', 'type', 'templateId'];
        break;

      case 'Schedule':
        this.modalID = '#add_schedule_model';
        this.notificationURL = '/admin/schedulelist';
        this.deleteTableDataURL = '/admin/deleteschedule';
        this.displayedColumns = [
          'schedule',
          'templateUsed',
          'type',
          'scheduleId',
        ];
        break;

      default:
        break;
    }
    this.notificationRequest();
  }

  // Achiever List Service
  private notificationRequest() {
    this._spin.show();
    this._admin.getApiWithAuth(this.notificationURL).subscribe((res) => {
      if (res.status.code === 0) {
        this.addTableColumnData(res.list);
      } else if (res.status.code === 401) {
        this._router.navigate(['/auth/login']);
        this._toast.warning(res.status.message);
      } else {
        this._toast.error('Oops! Something went wrong.');
      }
      res ? this._spin.hide() : null;
    });
  }

  // Delete Service Handler
  deleteHandler(d) {
    this._spin.show();
    this._admin
      .deleteApiWithAuth(this.deleteTableDataURL, d)
      .subscribe((res) => {
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
      });
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
