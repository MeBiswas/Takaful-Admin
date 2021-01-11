import { Component, OnInit } from '@angular/core';
// NGRX
import { Store, select } from '@ngrx/store';
// Actions
import * as UserActions from '../../store/actions/user.actions';
// Selectors
import * as fromUser from '../../store/selectors/user.selectors';
// User Interface
import { IUser } from 'src/app/model/user';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  user: any = [];
  errorMessage = '';
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  filter = '';
  showModal = false;

  userListResponseData = {
    userList: [],
  };

  userListUrl = '/security/userlist/0';

  constructor(
    private _store: Store,
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.getUsersList();
    this._store.dispatch(new UserActions.LoadUsers()); //action dispatched

    this._store.pipe(select(fromUser.getUser)).subscribe((user) => {
      this.user = user;
    });

    console.log('ethe aa', this.user);
  }

  // getUsersList() {
  //   this._spin.show();
  //   this._admin.getApiWithAuth(this.userListUrl).subscribe(
  //     (res) => {
  //       this.userListResponseData = { ...this.userListResponseData, ...res };
  //       console.log('Response in User List Service', this.userListResponseData);
  //     },
  //     (err) => {
  //       console.log('Error in User List Service', err);
  //       this._toast.error('Oops! Something went wrong.');
  //     }
  //   );
  //   this._spin.hide();
  // }
}
