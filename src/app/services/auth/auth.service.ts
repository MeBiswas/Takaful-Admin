import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_SERVER = "http://ilokensystem.ddns.net:28080/takaful/api/auth/login";

  constructor(private http: HttpClient) { }

  public loginRequest(user) {
    return this.http.post<any>(this.REST_API_SERVER, user);
  }
}
