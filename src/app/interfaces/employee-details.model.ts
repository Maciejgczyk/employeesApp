import { IEmployee } from "./employee.model";
import { ICompany } from "./company.model";

export interface IEmployeeDetails {
  data: IEmployee;
  company: ICompany;
}
