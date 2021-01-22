import { Component, OnInit } from '@angular/core';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Form
import { FormBuilder, Validators } from '@angular/forms';
// Service
import { AuthService } from '../../services/auth/auth.service';
// Email Regex Pattern
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  url = '/auth/forgotpassword';

  forgotPasswordForm = this._fb.group({
    email: ['', [Validators.required, Validators.pattern(pattern)]],
  });

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  // Form Field Getter
  get email() {
    return this.forgotPasswordForm.get('email');
  }

  // Submit Handler
  onSubmit(v) {
    !v
      ? this._toast.error('Please enter email')
      : this.forgotPassword(this.forgotPasswordForm.value);
  }

  // Forgot Password Service
  forgotPassword(d) {
    this._spin.show();
    this._auth.forgotPasswordRequest(this.url, d).subscribe(
      (res) => {
        if (res.status.code === 0) {
          this._toast.success(res.status.message);
        } else {
          this._toast.warning(res.status.message);
        }
        res ? this._spin.hide() : null;
      },
      (err) => {
        err ? this._spin.hide() : null;
        this._toast.error('Oops! Something went wrong.');
      }
    );
  }
}
