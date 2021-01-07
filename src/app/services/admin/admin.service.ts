import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpOptions: { headers: any };
  private base_url = 'http://ilokensystem.ddns.net:28080/takaful/api';

  constructor(private http: HttpClient) {}

  public getApiWithAuth(url): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(this.base_url + url, this.httpOptions);
  }

  public postApiWithAuth(url, data): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(this.base_url + url, data, this.httpOptions);
  }
}
