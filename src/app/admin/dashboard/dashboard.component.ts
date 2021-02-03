import { Component, OnInit } from '@angular/core';
// Interface
import { Filter } from '../../model/filter';

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

  constructor() {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getAuthData();
  }

  // Getting Data
  private getAuthData() {
    this.userData = JSON.parse(sessionStorage.getItem('auth'));
  }

  onFilterChanged(value) {
    // console.log('Filter Change', value);
  }
}
