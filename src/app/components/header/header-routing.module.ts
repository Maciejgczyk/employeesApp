import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClientsComponent} from "../companies/clients.component";
import {SettingsComponent} from "../settings/settings.component";

const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
