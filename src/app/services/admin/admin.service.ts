import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Configuration
import { config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpOptions: { headers: any };

  constructor(private http: HttpClient) {}

  public getUsersList() {
    const url = '/security/userlist/0';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(config.apiURL + url, this.httpOptions);
  }

  public getApiWithAuth(url): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(config.apiURL + url, this.httpOptions);
  }

  public postApiWithAuth(url, data): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(config.apiURL + url, data, this.httpOptions);
  }

  public deleteApiWithAuth(url): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(config.apiURL + url, this.httpOptions);
  }
}
