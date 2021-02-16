import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpOptions: { headers: any };
  httpNewOptions: { headers: any; body: any };

  constructor(private http: HttpClient) {}

  public getApiWithAuth(url): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(environment.apiURL + url, this.httpOptions);
  }

  public postApiWithAuth(url, data): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(environment.apiURL + url, data, this.httpOptions);
  }

  public deleteApiWithAuth(url, data): Observable<any> {
    this.httpNewOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: data,
    };
    return this.http.delete(environment.apiURL + url, this.httpNewOptions);
  }
}
