export interface IUser {
  accessToken: string;
  user : {
    id: number;
    email: string;
    password: string;
    nickname?: string;
  }
}
