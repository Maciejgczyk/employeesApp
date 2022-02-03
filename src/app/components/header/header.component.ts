import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EmployeesService } from 'src/app/services/employees.service';
import { AddEmployeeComponent } from '../dialogs/add-employee/add-employee.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private employeesService: EmployeesService) { }

  ngOnInit(): void { }

  addEmployee(): void {
    this.dialog.open(AddEmployeeComponent)
  }

  searchValue(searchValue: string) {
    this.employeesService.sendSearchValue(searchValue);
  }

}
