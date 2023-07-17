import Config from 'app/config';
import { Api } from 'app/data/services/api';
import { IAuthentication } from 'app/data/models/Authentication';
import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { CreateUserDto } from 'app/data/dto/user/user.dto';
import { IUser } from 'app/data/models';
import type { ApiConfig } from '../api/api.types';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export class UserApi extends Api {
  constructor(private readonly configApi: ApiConfig = DEFAULT_API_CONFIG) {
    super(configApi);
  }

  async login(data: LoginForm): Promise<any> {
    const response = await this.apisauce.post<IAuthentication>(
      '/auth/login',
      data,
    );

    if (!response.ok) {
      return response.problem;
    }

    return response?.data;
  }

  async register(data: FormData) {
    const response = await this.apisauce.post<IUser>('/user', data);

    if (!response.ok || !response) {
      return response.problem;
    }

    return response.data;
  }
}

export const userApi = new UserApi();
