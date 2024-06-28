import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interfaces/client.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  @Input() editedClient: Client;
  @Input() actionName: string;

  @Output() onSave = new EventEmitter();

  clientForm: FormGroup;
  clientColor = '#3f51b5';

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: this.clientColor,
    });

    if (this.editedClient) {
      this.clientColor = this.editedClient.color;
      this.clientForm.patchValue({
        name: this.editedClient.name,
        color: this.editedClient.color
      });
    }
  }

  formColorChange(color: string): void {
    this.clientForm.get('color').setValue(color);
  }

  createClient(): void {
    if (this.clientForm.valid) {
      if (!this.editedClient) {
        this.clientsService
          .createClient(this.clientForm.value)
          .subscribe(() => {
            this.clientForm.reset();
            this.clientColor = '#3f51b5';
            this.clientsService.reloadClients();
          });
      } else {
        this.clientsService
          .saveClient(this.editedClient.id, this.clientForm.value)
          .subscribe(() => {
            this.onSave.emit();
            this.clientsService.reloadClients();
          });
      }
    }
  }
}
