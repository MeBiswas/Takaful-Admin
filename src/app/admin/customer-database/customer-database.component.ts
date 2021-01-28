import { Component, OnInit, ViewChild } from '@angular/core';
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
export class CustomerDatabaseComponent implements OnInit {
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
      .subscribe(
        (res) => {
          this.dataSource.data = [...res.list];
          res ? this._spin.hide() : null;
        },
        (err) => {
          err ? this._spin.hide() : null;
          this._toast.error('Oops! Something went wrong.');
        }
      );
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
