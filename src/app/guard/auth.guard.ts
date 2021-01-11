import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Service
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(): boolean {
    if (this._auth.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['']);
      return false;
    }
  }
}
