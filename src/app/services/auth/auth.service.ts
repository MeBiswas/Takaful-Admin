import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = "http://ilokensystem.ddns.net:28080/takaful/api";

  constructor(private http: HttpClient) { }

  public loginRequest(url, user): Observable<any> {
    return this.http.post((this.base_url + url), user);
  }

  public forgotPasswordRequest(url, user): Observable<any> {
    return this.http.post((this.base_url + url), user);
  }
}
