export interface IEmployee {
  id: number;
  name: string;
  surname: string;
  company: {
    id: number;
    name: string;
    color: string;
  };
  technology: string;
}
