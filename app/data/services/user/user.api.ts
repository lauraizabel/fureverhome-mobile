/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import api from 'app/data/services/api';
import { IAuthentication } from 'app/data/models/Authentication';
import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { CreateUserDto } from 'app/data/dto/user/user.dto';
import { IUser } from 'app/data/models';
import type { ApiConfig } from '../api/api.types';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export class UserApi {
  private readonly url = '/users';

  async login(data: LoginForm): Promise<IAuthentication> {
    const response = await api.client.post<IAuthentication>(
      '/auth/login',
      data,
    );

    return response.data as IAuthentication;
  }

  async register(data: CreateUserDto): Promise<IUser> {
    const response = await api.client.post<IUser>(this.url, { ...data });

    return response.data as IUser;
  }

  async loadOngs(): Promise<IUser[]> {
    const response = await api.client.get<IUser[]>(`${this.url}/ongs`);

    return response.data;
  }
}

export const userApi = new UserApi();
