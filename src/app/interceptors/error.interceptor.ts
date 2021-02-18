import { Injectable } from '@angular/core';
// HTTP Services
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
// Toaster
import { ToastrService } from 'ngx-toastr';
// Spinner
import { NgxSpinnerService } from 'ngx-spinner';
// RxJS Service
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
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
      catchError((err: HttpErrorResponse) => {
        retry(1);
        if ([401, 403].indexOf(err.status) !== -1) {
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
