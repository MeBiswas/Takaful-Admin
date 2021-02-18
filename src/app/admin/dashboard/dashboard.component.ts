import { Component, OnInit } from '@angular/core';
// Store
import { Store, select } from '@ngrx/store';
// Interface
import { Filter } from '../../model/filter';
// Service
import { AdminService } from '../../services/admin/admin.service';
// Selectors
import * as fromUser from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userData;
  filter = 'Weekly';

  filters: Filter[] = [
    { value: 'Weekly', option: 'This Week' },
    { value: 'Monthly', option: 'This Month' },
  ];

  constructor(private _store: Store, private _admin: AdminService) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.storeData();
    this.getAuthData();
  }

  // Getting Data
  private getAuthData() {
    this.userData = this._admin.userData();
  }

  // Selector to get Data
  private storeData() {
    this._store.pipe(select(fromUser.getUser)).subscribe((user) => {
      // console.log('ethe aa', user);
    });
  }
}
