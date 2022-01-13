import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployee} from "../interfaces/employee.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:3000/employees')
  }
}
