import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/interfaces/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: IEmployee

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void { }

  deleteEmployee() {
    this.employeesService.deleteEmployee(this.employee.id)
      .subscribe(() => {
        this.employeesService.reloadEmployees();
      });
  }
}
