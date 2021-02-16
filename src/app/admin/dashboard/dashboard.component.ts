import { Component, OnInit } from '@angular/core';
// Store
import { Store, select } from '@ngrx/store';
// Interface
import { Filter } from '../../model/filter';
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

  constructor(private _store: Store) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.storeData();
    this.getAuthData();
  }

  // Getting Data
  private getAuthData() {
    this.userData = JSON.parse(sessionStorage.getItem('auth'));
  }

  // Selector to get Data
  private storeData() {
    this._store.pipe(select(fromUser.getUser)).subscribe((user) => {
      // console.log('ethe aa', user);
    });
  }
}
