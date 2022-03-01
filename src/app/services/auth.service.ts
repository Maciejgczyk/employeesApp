import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private userSession = new BehaviorSubject<IUser>(
    JSON.parse(localStorage.getItem('user'))
  );

  getUserData(): IUser {
    return this.userSession.getValue();
  }

  login(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/login', user).pipe(
      tap((session) => {
        this.userSession.next(session);
        localStorage.setItem('user', JSON.stringify(session));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSession.next(null);
    this.router.navigate(['/login']);
  }

  register(user: IUser) {
    return this.http.post<IUser>('http://localhost:3000/register', user);
  }

  changeUserData(user: IUser, id: number) {
    return this.http
      .patch<IUser>(`http://localhost:3000/users/${id}`, user)
      .pipe(tap((session) => this.userSession.next(session)));
  }

  deleteUser(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }
}
