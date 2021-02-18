import { Injectable } from '@angular/core';
// RxJS Service
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// HTTP Services
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpNewOptions: { headers: any; body: any };

  constructor(private http: HttpClient) {}

  public getToken() {
    return localStorage.getItem('token');
  }

  public userData() {
    let userData = JSON.parse(localStorage.getItem('auth'));
    return userData;
  }

  public getApiWithAuth(url): Observable<any> {
    return this.http.get(environment.apiURL + url).pipe(tap((res) => res));
  }

  public postApiWithAuth(url, data): Observable<any> {
    return this.http
      .post(environment.apiURL + url, data)
      .pipe(tap((res) => res));
  }

  public deleteApiWithAuth(url, data): Observable<any> {
    this.httpNewOptions = {
      headers: new HttpHeaders(),
      body: data,
    };
    return this.http
      .delete(environment.apiURL + url, this.httpNewOptions)
      .pipe(tap((res) => res));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    window.location.reload();
  }
}
