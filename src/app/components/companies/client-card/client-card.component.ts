import {Component, Input } from '@angular/core';
import {Client} from "../../../interfaces/client.model";
import {ConfirmationComponent} from "../../dialogs/confirmation/confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {ClientsService} from "../../../services/clients.service";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent {
  @Input() client: Client
  editedClientId: number;

  constructor(
    private dialog: MatDialog,
    private clientsService: ClientsService,
    private snackbarService: SnackbarService
  ) {}

  deleteClient(clientId: number, clientName: string): void {
    const confirmDialog = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Remove Client',
        message: `Are you sure, you want to delete a client: ${clientName}?`,
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.clientsService
          .deleteClient(clientId)
          .subscribe(() => {
            this.clientsService.reloadClients()
            this.snackbarService.openSnackbar('Deleted successfully')
          });
      }
    });
  }

}
