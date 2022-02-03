import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../../services/companies.service';
import { ICompany } from '../../../interfaces/company.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  @Input() editedCompany: ICompany;
  @Input() actionName: string;

  @Output() onSave = new EventEmitter();

  companyForm: FormGroup;
  companyColor = '#3f51b5';

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: this.companyColor,
    });

    if (this.editedCompany) {
      this.companyColor = this.editedCompany.color;
      this.companyForm.patchValue({
        name: this.editedCompany.name,
        color: this.editedCompany.color
      });
    }
  }

  formColorChange(color: string): void {
    this.companyForm.get('color').setValue(color);
  }

  createCompany(): void {
    if (this.companyForm.valid) {
      if (!this.editedCompany) {
        this.companiesService
          .createCompany(this.companyForm.value)
          .subscribe(() => {
            this.companyForm.reset();
            this.companyColor = '#3f51b5';
            this.companiesService.reloadCompanies();
          });
      } else {
        this.companiesService
          .saveCompany(this.editedCompany.id, this.companyForm.value)
          .subscribe(() => {
            this.onSave.emit();
            this.companiesService.reloadCompanies();
          });
      }
    }
  }
}
