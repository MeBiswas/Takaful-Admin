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

@Component({
  selector: 'app-customer-database',
  templateUrl: './customer-database.component.html',
  styleUrls: ['./customer-database.component.css'],
})
export class CustomerDatabaseComponent implements OnInit, AfterViewInit {
  search: string = '';
  filter: string = 'Monthly';
  dataSource = new MatTableDataSource();
  databaseURL = '/admin/customerdatabase';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filters: Filter[] = [
    { value: 'Weekly', option: 'Weekly' },
    { value: 'Monthly', option: 'Monthly' },
  ];

  columnsToDisplay: string[] = [
    'carRegister',
    'customerName',
    'principal',
    'expiredDate',
    'followUpDate',
    'phoneNo',
    'email',
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

  // Filter Event
  onFilterChanged(e) {
    this.getTableData(e);
  }

  // Service to Get Table Data
  private getTableData(f) {
    this._spin.show();
    this._admin
      .postApiWithAuth(this.databaseURL, {
        filter: f,
      })
      .subscribe((res) => {
        if (res.status.code === 0) {
          this.dataSource.data = [...res.list];
        } else if (res.status.code === 401) {
          this._router.navigate(['/auth/login']);
          this._toast.warning(res.status.message);
        } else {
          this._toast.error('Oops! Something went wrong.');
        }
        res ? this._spin.hide() : null;
      });
  }

  // Filter Table with Search Input
  searchFor(s: string) {
    this.dataSource.filter = s.trim().toLocaleLowerCase();
  }

  // Pagination Event
  pageChanged(e) {
    // console.log('Pagination Event', e);
  }
}
