import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any{
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status == 401 || error.status == 0) {
          this.router.navigate(['login']);
        }
        return of(error);
      })
    );
  }
}
