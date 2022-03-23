import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../interfaces/employee.model';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployeeDetails } from '../interfaces/employee-details.model';
import { CompaniesService } from './companies.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  public baseUrl = 'http://localhost:3000/employees';

  private employeeActions = new Subject<any>();
  private searchEmployeeValue = new Subject<string>();

  public reloadEmployees$ = this.employeeActions.asObservable();
  public searchValue$ = this.searchEmployeeValue.asObservable();

  constructor(
    private http: HttpClient,
    private companiesService: CompaniesService
  ) {}

  reloadEmployees(): void {
    this.employeeActions.next();
  }

  sendSearchValue(value: string): void {
    this.searchEmployeeValue.next(value);
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl);
  }

  getEmployeesWithDetails(): Observable<IEmployeeDetails[]> {
    return forkJoin([
      this.getEmployees(),
      this.companiesService.getCompanies(),
    ]).pipe(
      map(([employee, companies]) =>
        employee.map((item) => {
          return {
            data: item,
            company: companies.find((company) => company.id == item.companyId),
          };
        })
      )
    );
  }

  getEmployeeById(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.baseUrl}/${employeeId}`);
  }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.baseUrl, employee);
  }

  deleteEmployee(employeeId: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(`${this.baseUrl}/${employeeId}`);
  }

  saveEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.baseUrl}/${employee?.id}`, employee)
  }

  searchEmployees(value: string = ''): Observable<IEmployeeDetails[]> {
    return this.getEmployeesWithDetails().pipe(
      map((employees) =>
        employees.filter(({ data }) =>
          `${data.name} ${data.surname}`.toLowerCase()
            .includes(value.toLowerCase())
        )
      )
    );
  }
}
