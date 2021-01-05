import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Service
import { AuthService } from '../../services/auth/auth.service'
// Spinner
import { NgxSpinnerService } from "ngx-spinner";
// Toaster
import { ToastrService } from 'ngx-toastr';

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
  constructor(private _auth: AuthService, private _router: Router, private _spin: NgxSpinnerService, private _toast: ToastrService) { }

  ngOnInit() {
  }

  loginUser() {
    console.log('Form Data', this.loginUserData);
    this._spin.show();
    this._auth.loginRequest(this.url, this.loginUserData)
      .subscribe(
        res => {
          console.log("Response in Login Service", res)
          if (res.status.code === 0) {
            this._toast.success(res.status.message);
            localStorage.setItem('user', res.user);
            this._router.navigate(['/dashboard']);
          } else {
            this._toast.warning(res.status.message);
            this._router.navigate(['/invalid']);
          }
        },
        err => {
          console.log("Error in Login Service", err);
          this._toast.error(err.status.message);
        }
      )
    this._spin.hide();
  }

}
