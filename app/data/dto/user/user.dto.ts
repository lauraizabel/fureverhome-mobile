import { IUserAddress } from 'app/data/models';
import { UserType } from 'app/enum/UserType';
import { ChangePasswordFormValues } from 'app/screens/Private/Profile/ChangePassword/ChangePassword';
import { ImagePickerAsset } from 'expo-image-picker';
import { ZodType, z } from 'zod';

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
  picture?: ImagePickerAsset | null;
  type: UserType;
  description?: string | null;
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
  street: 'Rua Severina frança da silva',
  city: 'Caruaru',
  state: 'PE',
  neighborhood: 'Luiz Gonzaga',
};

export const ChangePasswordSchema: ZodType<ChangePasswordFormValues> = z.object(
  {
    currentPassword: z.string().min(6).max(100).nonempty(),
    newPassword: z.string().min(6).max(100).nonempty(),
    confirmNewPassword: z.string().min(6).max(100).nonempty(),
  },
);
