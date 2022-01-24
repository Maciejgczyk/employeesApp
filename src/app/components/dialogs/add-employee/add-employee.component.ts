import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICompany} from "../../../interfaces/company.model";
import {CompaniesService} from "../../../services/companies.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeesService} from "../../../services/employees.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  destroyComponent$: Subject<boolean> = new Subject<boolean>();
  allCompanies: ICompany[];
  employeeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private fb: FormBuilder,
    private companiesService: CompaniesService,
    private employeesService: EmployeesService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.companiesService.getCompanies()
      .pipe(
        takeUntil(this.destroyComponent$)
      )
      .subscribe(
      item => this.allCompanies = item
    )

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      company: ['', Validators.required],
      technology: '',
      info: ''
    })
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next();
    this.destroyComponent$.complete();
  }

  createEmployee() {
    if(this.employeeForm.valid) {
      this.employeesService.createEmployee(this.employeeForm.value).subscribe();
      this.employeesService.sendCreateEmployeeAction();

      this.snackbarService.openSnackbar('Created successfully');
      this.dialogRef.close();
    }
  }
}
