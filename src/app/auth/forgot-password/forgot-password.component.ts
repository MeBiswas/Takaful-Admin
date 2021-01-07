import { Component, OnInit } from '@angular/core';
// Service
import { AuthService } from '../../services/auth/auth.service';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  url = '/auth/forgotpassword';

  forgotPasswordData = {
    email: '',
  };

  constructor(
    private _auth: AuthService,
    private _spin: NgxSpinnerService,
    private _toast: ToastrService
  ) {}

  ngOnInit(): void {}

  forgotPassword() {
    // console.log('Forgot Password Component', this.forgotPasswordData);
    this._spin.show();
    this._auth
      .forgotPasswordRequest(this.url, this.forgotPasswordData)
      .subscribe(
        (res) => {
          console.log('Response in Forgot Password Service', res);
          if (res.status.code === 0) {
            this._toast.success(res.status.message);
          } else {
            this._toast.warning(res.status.message);
          }
        },
        (err) => {
          console.log('Error in Forgot Password Service', err);
          this._toast.error(err.status.message);
        }
      );
    this._spin.hide();
  }
}
