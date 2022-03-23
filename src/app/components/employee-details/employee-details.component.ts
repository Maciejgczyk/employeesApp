import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import {EmployeesService} from "../../services/employees.service";
import {IEmployee} from "../../interfaces/employee.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: IEmployee;
  employeeForm: FormGroup;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
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
          email: [this.employee.email, Validators.required],
          position: [this.employee.position, Validators.required],
          info: [this.employee.info, Validators.maxLength(100)],
        })
    });
  }

  saveEmployee() {
    this.employeesService.saveEmployee(this.employeeForm.value).subscribe();
  }
}
