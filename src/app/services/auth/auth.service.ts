import { Injectable } from '@angular/core';
// RxJS Service
import { Observable } from 'rxjs';
// HTTP Services
import { HttpClient } from '@angular/common/http';
// Environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  public loginRequest(url, user): Observable<any> {
    return this.http.post(environment.apiURL + url, user);
  }

  public forgotPasswordRequest(url, user): Observable<any> {
    return this.http.post(environment.apiURL + url, user);
  }
}
