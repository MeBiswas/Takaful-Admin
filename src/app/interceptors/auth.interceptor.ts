import { Injectable, Injector } from '@angular/core';
// HTTP Services
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
// RxJS Service
import { Observable } from 'rxjs';
// Services
import { AdminService } from '../services/admin/admin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _inject: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this._inject.get(AdminService);
    let tokenizedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    return next.handle(tokenizedRequest);
  }
}
