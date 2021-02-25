import { Component, OnInit, ViewChild } from '@angular/core';
// Router
import { Router } from '@angular/router';
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
    private _router: Router,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService,

  ) {}

  // pageEvent: MatPaginator;
  // datasource: null;
  // pageIndex:number;
  pageSize:number = 19;
  // length:number;

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
    this._admin.getApiWithAuth(this.userListURL + p).subscribe((res) => {
      if (res.status.code === 0) {

        console.log('user list =>',res.userList)
        this.addActionData(res.userList);
      } else if (res.status.code === 401) {
        this._router.navigate(['/auth/login']);
        this._toast.warning(res.status.message);
      } else {
        this._toast.error('Oops! Something went wrong.');
      }
      res ? this._spin.hide() : null;
    });
  }

  // Filter Table data as per input search
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  // Pagination Event
  pageChanged(e) {
    console.log('page =>',e);
    e.pageIndex > e.previousPageIndex ? this.getTableData(e.pageIndex) : null;
  }

  // Adding Table Action Column Data
  addActionData(d) {

    console.log('value d =>',d)
    let newArr = [...d];
    this.users = newArr.map((item) => (item = { ...item, action: item }));

    console.log('value user =>',this.users)
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


  onPageFired(e){
    e.pageIndex > e.previousPageIndex ? this.getTableData(e.pageIndex) : null;
    // this.theHttpService.theGetDataFunction(event.pageIndex).subscribe((data)=>{
    
    // this.dataSource = data
    // })
  }
}
