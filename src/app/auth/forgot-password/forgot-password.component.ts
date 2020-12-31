import { Component, OnInit } from '@angular/core';
// Service
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  url = "/auth/forgotpassword"

  forgotPasswordData = {
    email: ''
  }

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    console.log('Forgot Password Component', this.forgotPasswordData);
    this._auth.forgotPasswordRequest(this.url, this.forgotPasswordData)
    .subscribe(
      res => {
        console.log("Response in Forgot Password Service", res)
      },
      err => {
        console.log("Error in Forgot Password Service", err)
      }
    )
  }

}
