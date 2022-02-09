import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmployee } from 'src/app/interfaces/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: IEmployee

  constructor(
    private employeesService: EmployeesService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  deleteEmployee() {
    const confirmDialog = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Remove Employee',
        message: `Are you sure, you want to remove an employee: ${this.employee.name} ${this.employee.surname}?`
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.employeesService.deleteEmployee(this.employee.id)
          .subscribe(() => {
            this.employeesService.reloadEmployees();
            this.snackbarService.openSnackbar('Deleted successfully');
          });
      }
    });
  }
}
