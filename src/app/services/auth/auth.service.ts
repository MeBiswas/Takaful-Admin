import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Configuration
import { config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginRequest(url, user): Observable<any> {
    return this.http.post(config.apiURL + url, user);
  }

  public forgotPasswordRequest(url, user): Observable<any> {
    return this.http.post(config.apiURL + url, user);
  }
}
