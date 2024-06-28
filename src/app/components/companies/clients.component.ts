import {Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.model';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  allClients: Client[];
  search: FormControl = new FormControl('');

  constructor(
    private clientsService: ClientsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.clientsService.reloadClients$.subscribe(() => this.getClients());

    this.search.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => this.searchClients(value))
  }

  back(): void {
    this.location.back();
  }

  getClients(): void {
    this.clientsService.getClients().subscribe(clients => this.allClients = clients)
  }

  searchClients(value): void {
    this.clientsService.searchClients(value).subscribe(clients => this.allClients = clients);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allClients, event.previousIndex, event.currentIndex);
    // this.companiesService.updateCompaniesOrder(this.allCompanies).subscribe();
  }
}
