import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ICompany } from '../../interfaces/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  allCompanies: ICompany[];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.companiesService
      .reloadCompanies$.subscribe(() => this.getCompanies());
  }

  getCompanies(): void {
    this.companiesService
      .getCompanies()
      .subscribe((response) => (this.allCompanies = response));
  }

  deleteCompany(companyId: number): void {
    this.companiesService.deleteCompany(companyId)
      .subscribe(() => this.companiesService.sendCompanyAction());
  }

  searchCompanies(value): void {
    this.companiesService.searchCompanies(value.toLowerCase())
      .subscribe(el => this.allCompanies = el);
  }
}
