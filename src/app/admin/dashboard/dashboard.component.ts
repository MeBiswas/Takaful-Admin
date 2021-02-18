import { Component, OnInit } from '@angular/core';
// Interface
import { Filter } from '../../model/filter';
// Service
import { AdminService } from '../../services/admin/admin.service';

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

  constructor(private _admin: AdminService) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getAuthData();
  }

  // Getting Data
  private getAuthData() {
    this.userData = this._admin.userData();
  }
}
