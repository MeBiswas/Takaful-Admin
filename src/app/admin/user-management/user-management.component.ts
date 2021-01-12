import { Component, OnInit, ViewChild } from '@angular/core';
// NGRX
import { Store, select } from '@ngrx/store';
// Material Table Dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// Actions
import * as UserActions from '../../store/actions/user.actions';
// Selectors
import * as fromUser from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  filter = '';
  users: any = [];
  errorMessage = '';
  editUserData = {};
  addUserDialog = false;
  editUserDialog = false;
  deleteUserDialog = false;
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
  constructor(private _store: Store) {}

  ngOnInit() {
    // Dispatching Action
    this._store.dispatch(new UserActions.LoadUsers());
    // Selector to get Data
    this._store.pipe(select(fromUser.getUser)).subscribe((user) => {
      this.addActionData(user);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Filter Table data as per input search
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  // Pagination Event
  pageChanged(e) {
    console.log('Page Changed', e);
  }

  // Adding Table Action Column Data
  addActionData(d) {
    let newArr = [...d];
    this.users = newArr.map((item) => (item = { ...item, action: item }));
    this.dataSource.data = this.users;
  }

  // Edit Dialog Event Handler
  editDialog(a) {
    this.editUserData = { ...a, role: a.roleName };
    this.editUserDialog = !this.editUserDialog;
  }

  // Delete Dialog Event Handler
  deleteDialog(e) {
    this.deleteUserDialog = !this.deleteUserDialog;
  }
}
