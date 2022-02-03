import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../interfaces/company.model';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private companyActions = new Subject<any>();
  public reloadCompanies$ = this.companyActions.asObservable();

  constructor(private http: HttpClient) { }

  reloadCompanies(): void {
    this.companyActions.next();
  }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('http://localhost:3000/companies');
  }

  searchCompanies(value: string = ''): Observable<ICompany[]> {
    return this.getCompanies().pipe(
      map(companies => companies.filter(el => el.name.toLowerCase().includes(value)))
    )
  }

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>('http://localhost:3000/companies', company);
  }

  deleteCompany(companyId: number): Observable<ICompany> {
    return this.http.delete<ICompany>(
      `http://localhost:3000/companies/${companyId}`
    );
  }
}
