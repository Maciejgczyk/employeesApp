import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  companyColor = '#3f51b5';

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: this.companyColor,
    });
  }

  formColorChange(color: string): void {
    this.companyForm.get('color').setValue(color);
  }

  createCompany(): void {
    if (this.companyForm.valid) {
      this.companiesService
        .createCompany(this.companyForm.value)
        .subscribe(() => {
          this.companyForm.reset();
          this.companyColor = '#3f51b5';
          this.companiesService.reloadCompanies();
        });
    }
  }
}
