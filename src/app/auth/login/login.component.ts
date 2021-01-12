import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';
// Service
import { AuthService } from '../../services/auth/auth.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Provider
import { DataStorage } from '../../providers/user-data.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url = '/auth/login';

  loginUserData = {
    userId: '',
    password: '',
  };
  constructor(
    private _router: Router,
    private _data: DataStorage,
    private _auth: AuthService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {}

  loginUser() {
    this._spin.show();
    this._auth.loginRequest(this.url, this.loginUserData).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._data.data = res.user;
          this._toast.success(res.status.message);
          localStorage.setItem('token', res.user.accessToken);
          sessionStorage.setItem('auth', JSON.stringify(res.user));
          this._router.navigate(['/admin/dashboard']);
        } else {
          this._toast.warning('Oops! Something went wrong.');
          this._router.navigate(['/auth/invalid']);
        }
      },
      (err) => {
        console.log('Error in Login Service', err);
        this._toast.error(err.status.message);
      }
    );
    this._spin.hide();
  }
}
