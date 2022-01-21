import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICompany} from "../interfaces/company.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('http://localhost:3000/companies');
  }
}
