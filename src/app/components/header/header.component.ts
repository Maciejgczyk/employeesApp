import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { AddEmployeeComponent } from '../dialogs/add-employee/add-employee.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  search: FormControl = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.employeesService.sendSearchValue(value));
  }

  addEmployee(): void {
    this.dialog.open(AddEmployeeComponent);
  }
}
