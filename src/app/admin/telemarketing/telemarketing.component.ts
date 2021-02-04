import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Interface
import { Filter } from '../../model/filter';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'app-telemarketing',
  templateUrl: './telemarketing.component.html',
  styleUrls: ['./telemarketing.component.css'],
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
export class TelemarketingComponent implements OnInit, AfterViewInit {
  search = '';
  basket: any = [];
  filter = 'monthly';
  detailComponentData = '';
  data: any = { email: '', phoneNo: null };
  dataSource = new MatTableDataSource();
  telemarketingURL = '/admin/marketing/list/';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filters: Filter[] = [
    { value: 'weekly', option: 'Weekly' },
    { value: 'monthly', option: 'Monthly' },
  ];

  columnsToDisplay: string[] = [
    'carRegister',
    'expiredDate',
    'followUpDate',
    'phoneNo',
    'email',
    'action',
    'callStatus',
    'customerStatus',
  ];

  constructor(
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getTableData(this.filter);
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Getting Data from Child
  addData(d) {
    this.data = d;
  }

  // Filter Event
  onFilterChanged(e) {
    this.getTableData(e);
  }

  // Service Call to get Table Data
  private getTableData(filter) {
    this._spin.show();
    this._admin.getApiWithAuth(this.telemarketingURL + filter).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this.dataSource.data = res.telemarketingList;
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
