import Config from 'app/config';
import { Api } from 'app/data/services/api';
import { IAuthentication } from 'app/data/models/Authentication';
import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { CreateUserDto } from 'app/data/dto/user/user.dto';
import { IUser } from 'app/data/models';
import {
  GeneralApiProblem,
  getGeneralApiProblem,
} from 'app/data/services/api/apiProblem';
import type { ApiConfig } from '../api/api.types';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export class UserApi extends Api {
  private readonly url = '/users';

  constructor(private readonly configApi: ApiConfig = DEFAULT_API_CONFIG) {
    super(configApi);
    console.log(this.configApi, configApi);
  }

  async login(data: LoginForm): Promise<any> {
    const response = await this.apisauce.post<IAuthentication>(
      '/auth/login',
      data,
    );

    if (!response.ok) {
      const error = getGeneralApiProblem(response);
      return error;
    }

    return response?.data;
  }

  async register(data: CreateUserDto): Promise<IUser | GeneralApiProblem> {
    const response = await this.apisauce.post<IUser>(this.url, { ...data });

    if (!response.ok) {
      const error = getGeneralApiProblem(response);
      return error;
    }

    return response.data as IUser;
  }
}

export const userApi = new UserApi();
