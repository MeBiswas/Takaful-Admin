import { Injectable } from '@angular/core';
// HTTP Services
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
// Toaster
import { ToastrService } from 'ngx-toastr';
// RxJS Service
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// Services
import { AdminService } from '../services/admin/admin.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _admin: AdminService,
    private _toast: ToastrService,
    private _spin: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this._spin.hide();
          this._admin.logout();
          this._toast.warning('Your Session has expired. Please Login again.');
        } else {
          this._spin.hide();
          this._toast.error('Oops! Something went wrong.');
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
