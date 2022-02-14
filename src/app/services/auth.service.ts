import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {IUser} from "../interfaces/user.model";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private userSession = new BehaviorSubject<IUser>(null);

  getToken() {

  }

  login(user): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3000/login', user).pipe(
      tap(el => console.log(el))
    )
  }
}
