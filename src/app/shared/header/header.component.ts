import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData;

  constructor() {}

  // LifeCycle Method
  ngOnInit(): void {
    this.getAuthData();
  }

  // Getting Data
  private getAuthData() {
    this.userData = JSON.parse(sessionStorage.getItem('auth'));
  }

  // Logging Out
  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('auth');
    window.location.reload();
  }
}
