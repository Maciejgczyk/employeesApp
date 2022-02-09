import {Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ICompany } from '../../interfaces/company.model';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  allCompanies: ICompany[];
  search: FormControl = new FormControl('');

  constructor(
    private companiesService: CompaniesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCompanies();
    this.companiesService.reloadCompanies$.subscribe(() => this.getCompanies());

    this.search.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => this.searchCompanies(value))
  }

  back(): void {
    this.location.back();
  }

  getCompanies(): void {
    this.companiesService.getCompanies().subscribe(companies => this.allCompanies = companies)
  }

  searchCompanies(value): void {
    this.companiesService.searchCompanies(value).subscribe(companies => this.allCompanies = companies);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allCompanies, event.previousIndex, event.currentIndex);
    // this.companiesService.updateCompaniesOrder(this.allCompanies).subscribe();
  }
}
