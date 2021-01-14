import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData;

  constructor() {}

  ngOnInit(): void {
    this.getAuthData();
  }

  private getAuthData() {
    this.userData = JSON.parse(sessionStorage.getItem('auth'));
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('auth');
    window.location.reload();
  }
}
