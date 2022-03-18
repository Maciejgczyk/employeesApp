import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import {EmployeesService} from "../../services/employees.service";
import {IEmployee} from "../../interfaces/employee.model";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: IEmployee;

  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => this.employeesService.getEmployeeById(id))
      ).subscribe(employee => this.employee = employee);
  }

}
