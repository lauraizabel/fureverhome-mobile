import { IUser } from 'app/data/models/User';

export interface IUserAddress {
  id: number;
  user?: IUser;
  street: string;
  state: string;
  city: string;
  neighborhood: string;
  number?: string | null;
  updatedAt?: Date;
  createdAt?: Date;
}
