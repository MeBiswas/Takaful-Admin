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

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  filter = '';
  users: any = [];
  editUserData = {};
  deleteUserData = '';
  userListURL = '/security/userlist/';
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'userName',
    'userId',
    'email',
    'department',
    'roleName',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  // LifeCycle Method
  ngOnInit() {
    this.getTableData(0);
  }

  // LifeCycle Method
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Service Handler
  getTableData(p) {
    this._spin.show();
    this._admin.getApiWithAuth(this.userListURL + p).subscribe(
      (res) => {
        res ? this._spin.hide() : null;
        this.addActionData(res.userList);
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }

  // Filter Table data as per input search
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  // Pagination Event
  pageChanged(e) {
    e.pageIndex > e.previousPageIndex ? this.getTableData(e.pageIndex) : null;
  }

  // Adding Table Action Column Data
  addActionData(d) {
    let newArr = [...d];
    this.users = newArr.map((item) => (item = { ...item, action: item }));
    this.dataSource.data = [...this.dataSource.data, ...this.users];
    this.dataSource.data = this.getUniqueListBy(this.dataSource.data, 'email');
  }

  // Edit Dialog Event Handler
  editDialog(a) {
    this.editUserData = { ...a, role: a.roleName };
  }

  // Delete Dialog Event Handler
  deleteDialog(e) {
    this.deleteUserData = e;
  }

  // Filter Array for Unique Objcts
  getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
}
