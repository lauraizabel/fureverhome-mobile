import { IUserAddress } from 'app/data/models';
import { UserType } from 'app/enum/UserType';

export interface CreateUserDto extends Omit<IUserAddress, 'id'> {
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
  street: '',
  city: '',
  state: '',
  neighborhood: '',
};

export const createUserDto: CreateUserDto = {
  firstName: 'John',
  lastName: 'Doe',
  password: 'mysecretpassword',
  confirmPassword: 'mysecretpassword',
  phone: '1234567890',
  dateOfBirth: new Date('1990-01-01'),
  email: 'johndoe@example.com',
  type: UserType.FISICAL,
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  neighborhood: 'Anyone',
};
