import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private userSession = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('user')));

  isLogin = false;

  state = this.userSession.pipe(
    map((session) => !!session),
    tap((state) => (this.isLogin = state))
  );

  getToken() {
    return this.userSession.getValue()?.accessToken;
  }

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/login', user).pipe(
      tap((session) => {
        this.userSession.next(session);
        localStorage.setItem('user', JSON.stringify(session));
      })
    );
  }

  register(user: IUser) {
    return this.http.post<IUser>('http://localhost:3000/register', user);
  }
}
