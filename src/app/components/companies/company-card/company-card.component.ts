import {Component, Input } from '@angular/core';
import {ICompany} from "../../../interfaces/company.model";
import {ConfirmationComponent} from "../../dialogs/confirmation/confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {CompaniesService} from "../../../services/companies.service";

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company: ICompany
  editedCompanyId: number;

  constructor(private dialog: MatDialog, private companiesService: CompaniesService) {}

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

}
