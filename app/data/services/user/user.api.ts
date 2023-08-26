/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import api from 'app/data/services/api';
import { IAuthentication } from 'app/data/models/Authentication';
import { LoginForm } from 'app/screens/Public/Welcome/Form/WelcomeForm';
import { CreateUserDto } from 'app/data/dto/user/user.dto';
import { IFile, IUser } from 'app/data/models';
import { ChangePasswordFormValues } from 'app/screens/Private/Profile/ChangePassword/ChangePassword';
import { ImagePickerAsset } from 'expo-image-picker';
import { fi } from 'date-fns/locale';
import { EditUserForm } from 'app/screens';
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

  async uploadPicture(
    id: number,
    picture: ImagePickerAsset,
  ): Promise<IFile | undefined> {
    if (picture.base64) {
      const form = {
        file: {
          uri: picture.uri,
          name: picture.uri.split('/').pop(),
          type: 'image/jpeg',
          base64: picture.base64,
        },
      };
      const file = await api.client.post<IFile>(
        `${this.url}/${id}/image`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return file.data;
    }
    return undefined;
  }

  async deletePicture(data: { id: number; imageId: number }): Promise<void> {
    const { id, imageId } = data;
    await api.client.delete(`${this.url}/${id}/image/${imageId}`);
  }

  async updateUserInfo(userId: number, data: EditUserForm): Promise<IUser> {
    const response = await api.client.put<IUser>(`${this.url}/${userId}`, {
      ...data,
    });

    return response.data;
  }
}

export const userApi = new UserApi();
