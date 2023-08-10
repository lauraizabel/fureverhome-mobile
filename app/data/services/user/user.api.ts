/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import api from 'app/data/services/api';
import { IAuthentication } from 'app/data/models/Authentication';
import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { CreateUserDto } from 'app/data/dto/user/user.dto';
import { IUser } from 'app/data/models';
import { ChangePasswordFormValues } from 'app/screens/Private/Profile/ChangePassword/ChangePassword';
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

  async changePassword(
    data: ChangePasswordFormValues,
    userId: number,
  ): Promise<void> {
    await api.client.put(`${this.url}/${userId}/change-password`, { ...data });
  }

  async register(data: CreateUserDto): Promise<IUser> {
    const response = await api.client.post<IUser>(this.url, { ...data });

    return response.data as IUser;
  }

  async loadOngs(): Promise<IUser[]> {
    const response = await api.client.get<IUser[]>(`${this.url}/ongs`);

    return response.data;
  }

  async loadUser(id: string): Promise<IUser> {
    const response = await api.client.get<IUser>(`${this.url}/${id}`);

    return response.data;
  }

  async uploadPicture(id: number, picture: FormData): Promise<void> {
    await api.client.post(`${this.url}/${id}/image`, picture, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deletePicture(data: { id: string; imageId: string }): Promise<void> {
    const { id, imageId } = data;
    await api.client.delete(`${this.url}/${id}/image/${imageId}`);
  }
}

export const userApi = new UserApi();
