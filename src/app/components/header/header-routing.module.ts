import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CompaniesComponent} from "../companies/companies.component";
import {SettingsComponent} from "../settings/settings.component";

const routes: Routes = [
  {
    path: 'companies',
    component: CompaniesComponent
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
