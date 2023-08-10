import { IUserAddress } from 'app/data/models/UserAddress';
import { UserType } from 'app/enum/UserType';
import { IFile } from 'app/data/models/File';
import { IAnimal } from 'app/data/models/Animal';

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  job?: string | null;
  cpf?: string | null;
  cnpj?: string | null;
  phone?: string | null;
  picture?: IFile | null;
  description?: string | null;
  type: UserType;
  userAddress: IUserAddress;
  animal: IAnimal[];
  updatedAt?: Date;
  createdAt?: Date;
  distance?: number | string;
}
