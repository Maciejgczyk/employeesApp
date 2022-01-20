import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddEmployeeComponent } from '../dialogs/add-employee/add-employee.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  addEmployee(): void {
    this.dialog.open(AddEmployeeComponent, {
      data: 'tu będzie formularz'
    });
  }

}
