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
  selector: 'app-common-basket',
  templateUrl: './common-basket.component.html',
  styleUrls: ['./common-basket.component.css'],
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
export class CommonBasketComponent implements OnInit {
  routeData;
  search = '';
  basket: any = [];
  filter = 'Monthly';
  basketURL: string = '';
  detailComponentData = '';
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

  columnsToDisplay: string[] = [
    'vehiclePlateNo',
    'customerName',
    'paymentDate',
    'principal',
    'carModel',
    'status',
    'customerService',
  ];

  constructor(
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService,
    private activatedroute: ActivatedRoute
  ) {}

  // LifeCyle Method
  ngOnInit(): void {
    this.getRouteData();
    this.getTableData(this.filter);
  }

  // LifeCyle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Getting Page Data from Route
  private getRouteData() {
    this.activatedroute.data.subscribe((data) => {
      this.routeData = { ...data };
    });
    this.routeData.category === 'Endorsement'
      ? (this.basketURL = '/admin/dashboard/endorsement/list')
      : (this.basketURL = '/admin/dashboard/followup/list');
    this.routeData.page === 'Market Value'
      ? this.columnsToDisplay.splice(5, 0, 'marketValue')
      : null;
  }

  // Filter Event
  onFilterChanged(e) {
    this.getTableData(e);
  }

  // Preparing Body for Table Data API
  tableBodyData(r, f) {
    let data = {
      type: '',
      filter: '',
      isUrgent: '',
    };
    data.filter = f;
    data.type = r.page;
    data.isUrgent = r.subCategory === 'Urgent' ? 'Y' : 'N';
    return data;
  }

  // Service Call to get Table Data
  private getTableData(filter) {
    this._spin.show();
    let d = this.tableBodyData(this.routeData, filter);
    this._admin.postApiWithAuth(this.basketURL, d).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this.dataSource.data = res.list;
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

  // Pagination Event
  pageChanged(e) {
    // console.log('Pagination Event', e);
  }

  // Filter Table with Search Input
  searchFor(s: string) {
    this.dataSource.filter = s.trim().toLocaleLowerCase();
  }

  // On Expanding Table
  onTableExpand(d) {
    this.detailComponentData = d;
  }
}
