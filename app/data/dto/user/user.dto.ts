import { IUserAddress } from 'app/data/models';
import { UserType } from 'app/enum/UserType';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: Date | null;
  email: string;
  job?: string | null;
  cpf?: string | null;
  cnpj?: string | null;
  picture?: string | null;
  type: UserType;
  userAddress: Omit<IUserAddress, 'id'>;
}

export const defaultCreateUserDto: CreateUserDto = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  email: '',
  job: '',
  cpf: '',
  phone: '',
  picture: null,
  type: UserType.FISICAL,
  dateOfBirth: null,
  userAddress: {
    street: '',
    city: '',
    state: '',
    neighborhood: '',
  },
};
