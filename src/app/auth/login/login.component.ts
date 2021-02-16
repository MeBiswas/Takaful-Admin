import { Component, OnInit } from '@angular/core';
// Store
import { Store } from '@ngrx/store';
// Router
import { Router } from '@angular/router';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AuthService } from '../../services/auth/auth.service';
// Provider
import { DataStorage } from '../../providers/user-data.provider';
// Actions
import * as UserActions from '../../store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url = '/auth/login';

  loginForm = this._fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private _store: Store,
    private _router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _data: DataStorage,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit() {}

  // Submit Method
  onSubmit(v) {
    !v
      ? this._toast.error('Please fill all required fields')
      : this.loginUser(this.loginForm.value);
  }

  // Login Service
  loginUser(d) {
    this._spin.show();
    this._auth.loginRequest(this.url, d).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
          localStorage.setItem('token', res.user.accessToken);
          sessionStorage.setItem('auth', JSON.stringify(res.user));
          this._store.dispatch(new UserActions.LoadUser(res.user));
          this._router.navigate(['/admin/dashboard']);
        } else {
          this._data.data = res.status;
          this._toast.warning(res.status.message);
          this._router.navigate(['/auth/invalid']);
        }
        res ? this._spin.hide() : null;
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error(err.status.message);
      }
    );
  }
}
