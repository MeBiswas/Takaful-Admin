import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData;

  constructor(private _admin: AdminService) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getAuthData();
  }

  // Getting Data
  private getAuthData() {
    this.userData = this._admin.userData();
  }

  // Logging Out
  logout() {
    this._admin.logout();
  }
}
