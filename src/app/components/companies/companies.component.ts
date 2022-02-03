import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ICompany } from '../../interfaces/company.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  allCompanies: ICompany[];

  constructor(private companiesService: CompaniesService, private dialog: MatDialog) { }

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

  deleteCompany(companyId: number, companyName: string): void {
    const confirmDialog = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Remove Company',
        message: `Are you sure, you want to delete a company: ${companyName}?`
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.companiesService.deleteCompany(companyId)
          .subscribe(() => this.companiesService.reloadCompanies());
      }
    });
  }

  searchCompanies(value): void {
    this.companiesService.searchCompanies(value.toLowerCase())
      .subscribe(el => this.allCompanies = el);
  }
}
