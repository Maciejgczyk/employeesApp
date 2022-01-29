import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../interfaces/company.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private companyActions = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendCompanyAction(): void {
    this.companyActions.next();
  }

  reloadCompanies(): Observable<any> {
    return this.companyActions.asObservable();
  }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('http://localhost:3000/companies');
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
