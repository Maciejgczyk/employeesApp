import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployee} from "../interfaces/employee.model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private createEmployeeAction = new Subject<any>()

  constructor(private http: HttpClient) { }

  sendCreateEmployeeAction(): void {
    this.createEmployeeAction.next()
  }

  getCreateeEmployeeAction(): Observable<any> {
    return this.createEmployeeAction.asObservable()
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:3000/employees');
  }

  createEmployee(employee: IEmployee) {
    return this.http.post<IEmployee>('http://localhost:3000/employees', employee);
  }
}
