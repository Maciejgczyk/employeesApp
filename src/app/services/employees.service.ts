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

  public reloadEmployees$ = this.employeeActions.asObservable();
  public searchValue$ = this.searchEmployeeValue.asObservable();

  constructor(private http: HttpClient) {}

  reloadEmployees(): void {
    this.employeeActions.next();
  }

  sendSearchValue(value: string): void {
    this.searchEmployeeValue.next(value);
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

  searchEmployees(value: string = ''): Observable<IEmployee[]> {
    return this.getEmployees().pipe(
      map((employees) =>
        employees.filter((employee) =>
          `${employee.name} ${employee.surname}`
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      )
    );
  }
}
