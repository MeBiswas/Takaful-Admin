import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
// Service
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this._auth.isLoggedIn();
    const currentUserData = this._auth.userData();

    if (currentUser) {
      // Checking if Route is Restricted by Role
      if (
        route.data.roles &&
        route.data.roles.indexOf(currentUserData.roleName) === -1
      ) {
        // Role is not Authorized
        this._router.navigate(['']);
        return false;
      }
      // Role is Authorized
      return true;
    }

    // Not Logged In
    this._router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
