import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = "http://ilokensystem.ddns.net:28080/takaful/api";

  private REST_API_SERVER = "/auth/login";

  constructor(private http: HttpClient) { }

  public loginRequest(user) {
    return this.http.post<any>(this.base_url + this.REST_API_SERVER, user);
  }
}
