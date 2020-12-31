import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Service
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = "/auth/login"

  loginUserData = {
    userId: '',
    password: ''
  }
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    console.log('Form Data', this.loginUserData);
    this._auth.loginRequest(this.url, this.loginUserData)
      .subscribe(
        res => {
          console.log("Response in Login Service", res)
          if (res.status.code === 0) {
            localStorage.setItem('user', res.user)
          } else {
            this._router.navigate(['/invalid']);
          }
        },
        err => {
          console.log("Error in Login Service", err)
        }
      )
  }

}
