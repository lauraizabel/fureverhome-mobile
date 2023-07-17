import { IUser } from 'app/data/models/User';

export interface IAuthentication {
  accessToken: string;
  user: IUser;
}
