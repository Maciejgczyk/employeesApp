import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../interfaces/employee.model';
import { Observable, Subject } from 'rxjs';
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  public baseUrl = 'http://localhost:3000/employees';

  private employeeActions = new Subject<any>();
  private searchEmployeeValue = new Subject<string>();
  private filterEmployees = new Subject<any>();

  public reloadEmployees$ = this.employeeActions.asObservable();
  public searchValue$ = this.searchEmployeeValue.asObservable();
  public filterEmployees$ = this.filterEmployees.asObservable();

  constructor(private http: HttpClient) {}

  reloadEmployees(): void {
    this.employeeActions.next();
  }

  sendSearchValue(value: string): void {
    this.searchEmployeeValue.next(value);
  }

  sendFilteredEmployees(value: string): void {
    this.filterEmployees.next(value);
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl).pipe(
      share()
    );
  }

  getFilteredEmployees(value: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${this.baseUrl}?company.name=${value}`)
  }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.baseUrl, employee);
  }

  deleteEmployee(employeeId: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(`${this.baseUrl}/${employeeId}`);
  }

  searchEmployees(value: string = ''): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${this.baseUrl}?name_like=${value}`);
  }
}
