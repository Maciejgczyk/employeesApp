import { Component, OnInit } from '@angular/core';
import {CompaniesService} from "../../../services/companies.service";
import {map, tap} from "rxjs/operators";
import {EmployeesService} from "../../../services/employees.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  allCompanies: Array<string>;

  constructor(private companiesService: CompaniesService, private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.companiesService.getCompanies().pipe(
      map(companies => companies.map(el => el.name))
    ).subscribe(item => this.allCompanies = item);
  }

  onChange(value: any) {
    this.employeesService.getFilteredEmployees(value).pipe(
      tap(el => console.log(el))
    ).subscribe();
  }
}
