import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginRequest(url, user): Observable<any> {
    return this.http.post(environment.apiURL + url, user);
  }

  public forgotPasswordRequest(url, user): Observable<any> {
    return this.http.post(environment.apiURL + url, user);
  }

  public isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
