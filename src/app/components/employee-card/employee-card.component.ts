import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/interfaces/employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: IEmployee

  constructor() { }

  ngOnInit(): void { }

}
