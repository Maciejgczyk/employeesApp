import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../interfaces/employee.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employeeActions = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendEmployeeAction(): void {
    this.employeeActions.next();
  }

  reloadEmployees(): Observable<any> {
    return this.employeeActions.asObservable();
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:3000/employees');
  }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(
      'http://localhost:3000/employees',
      employee
    );
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete<IEmployee>(
      `http://localhost:3000/employees/${employeeId}`
    );
  }
}
