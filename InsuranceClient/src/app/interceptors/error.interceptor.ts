import { CommonService } from './../services/common.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { InsuranceFormComponent } from '../insurance-form/insurance-form.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private commonService: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( error => {
        console.log("Error message from console" + error);
        //this.router.navigateByUrl("/http-error");
        this.commonService.showToast("API sunucuya bağlanılamadı", "error")
        return throwError(() => error);
      })
    );
  }



}
