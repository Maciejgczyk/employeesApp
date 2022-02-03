import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../interfaces/employee.model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private employeeActions = new Subject<any>();
  private searchEmployeeValue = new Subject<string>();
  public searchValue$ = this.searchEmployeeValue.asObservable();

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

  deleteEmployee(employeeId: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(
      `http://localhost:3000/employees/${employeeId}`
    );
  }

  sendSearchValue(value: string): void {
    this.searchEmployeeValue.next(value);
  }

  searchEmployees(value: string = ''): Observable<IEmployee[]> {
    return this.getEmployees()
      .pipe(
        map(employee => employee.filter(el => el.name.toLowerCase().includes(value.toLowerCase())))
      )
  }
}
