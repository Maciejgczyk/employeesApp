import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'src/app/services/employees.service';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';
import {SnackbarService} from "../../services/snackbar.service";
import {IEmployeeDetails} from "../../interfaces/employee-details.model";

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: IEmployeeDetails;

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
        message: `Are you sure, you want to remove an employee: ${this.employee?.data?.name} ${this.employee?.data?.surname}?`
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.deleteEmployee(this.employee?.data?.id)
          .subscribe(() => {
            this.employeesService.reloadEmployees();
            this.snackbarService.openSnackbar('Deleted successfully');
          });
      }
    });
  }
}
