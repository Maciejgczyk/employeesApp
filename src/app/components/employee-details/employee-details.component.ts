import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import {EmployeesService} from "../../services/employees.service";
import {IEmployee} from "../../interfaces/employee.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompaniesService} from "../../services/companies.service";
import {ICompany} from "../../interfaces/company.model";
import {Location} from "@angular/common";
import {SnackbarService} from "../../services/snackbar.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: IEmployee;
  companies$: Observable<ICompany[]>;

  employeeForm: FormGroup;

  constructor(
    private employeesService: EmployeesService,
    private companiesService: CompaniesService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => this.employeesService.getEmployeeById(id))
      ).subscribe(employee => {
        this.employee = employee;
        this.employeeForm = this.fb.group({
          id: this.employee.id,
          name: [this.employee.name, [Validators.required, Validators.minLength(2)]],
          surname: [this.employee.surname, [Validators.required, Validators.minLength(3)]],
          companyId: [this.employee.companyId, Validators.required],
          technology: this.employee.technology,
          email: this.employee.email,
          position: [this.employee.position, Validators.required],
          info: [this.employee.info, Validators.maxLength(100)],
        })
    });

    this.companies$ = this.companiesService.getCompanies();
  }

  saveEmployee(): void {
    this.employeesService.saveEmployee(this.employeeForm.value).subscribe(() => {
      this.snackbarService.openSnackbar('Saved successfully');
      this.back();
    });
  }

  back(): void {
    this.location.back();
  }
}
