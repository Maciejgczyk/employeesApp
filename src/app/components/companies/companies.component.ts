import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ICompany } from '../../interfaces/company.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';
import { Observable } from 'rxjs';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  allCompanies$: Observable<ICompany[]>;
  editedCompanyId: number;

  search: FormControl = new FormControl('');


  constructor(
    private companiesService: CompaniesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.companiesService.reloadCompanies$.subscribe(() => this.getCompanies());

    this.search.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => this.searchCompanies(value))
  }

  getCompanies(): void {
    this.allCompanies$ = this.companiesService.getCompanies();
  }

  deleteCompany(companyId: number, companyName: string): void {
    const confirmDialog = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Remove Company',
        message: `Are you sure, you want to delete a company: ${companyName}?`,
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.companiesService
          .deleteCompany(companyId)
          .subscribe(() => this.companiesService.reloadCompanies());
      }
    });
  }

  searchCompanies(value): void {
    this.allCompanies$ = this.companiesService.searchCompanies(value);
  }
}
