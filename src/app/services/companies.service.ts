import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompany } from '../interfaces/company.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  public baseUrl = 'http://localhost:3000/companies';

  private companyActions = new Subject<any>();
  public reloadCompanies$ = this.companyActions.asObservable();

  constructor(private http: HttpClient) {}

  reloadCompanies(): void {
    this.companyActions.next();
  }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(this.baseUrl);
  }

  searchCompanies(value: string = ''): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.baseUrl}?name_like=${value}`);
  }

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(this.baseUrl, company);
  }

  saveCompany(companyId: number, company: ICompany) {
    return this.http.put<ICompany>(`${this.baseUrl}/${companyId}`, company);
  }

  deleteCompany(companyId: number): Observable<ICompany> {
    return this.http.delete<ICompany>(`${this.baseUrl}/${companyId}`);
  }
}
