import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGV1c3pAbzIucGwiLCJpYXQiOjE2NDQ4NzE5ODgsImV4cCI6MTY0NDg3NTU4OCwic3ViIjoiMSJ9.TRC1oH_7-wWQzeLFdVwKoOJGF0n2YUEnPHp0KGQm0HY`
      }
    });
    return next.handle(request);
  }
}
