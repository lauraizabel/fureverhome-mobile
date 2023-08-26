import Config from 'app/config';
import api from 'app/data/services/api';
import { IAnimal } from 'app/data/models';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { Page, QueryPagination } from 'app/core/pagination';
import { AnimalSize } from 'app/enum/AnimalSize';
import { AnimalType } from 'app/enum/AnimalType';
import { AnimalSex } from 'app/enum/AnimalSex';
import type { ApiConfig } from '../api/api.types';
import { AnimalFormData } from '../../dto/animal/animal.dto';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

interface AnimalQuerySearch {
  size?: AnimalSize;
  minAge?: number;
  maxAge?: number;
  sex?: AnimalSex;
  radius?: number;
  type?: AnimalType;
  name?: string;
}

export type AnimalQuery = QueryPagination & AnimalQuerySearch;

export class AnimalApi {
  private readonly url = '/animals';

  async getAllAnimal(queryParams?: AnimalQuery): Promise<IAnimal[]> {
    let query = {};
    if (queryParams) {
      query = api.buildQueryString(queryParams);
    }
    const response = await api.client.get<IAnimal[]>(`${this.url}?${query}`);

    return response.data;
  }

  async getAnimalByUser(
    userId: number,
    queryParams: AnimalQuery,
  ): Promise<IAnimal[]> {
    const response = await api.client.get<IAnimal[]>(
      `${this.url}/user/${userId}?${api.buildQueryString(queryParams)}`,
    );
    return response.data;
  }

  async deleteAnimal(animalId: number | string): Promise<void> {
    await api.client.delete(`${this.url}/${animalId}`);
  }

  async createAnimal(animal: AnimalFormData): Promise<IAnimal> {
    const response = await api.client.post<IAnimal>(this.url, animal);
    return response.data;
  }

  async updateAnimal(
    animalId: number,
    animal: AnimalFormData,
  ): Promise<IAnimal> {
    const response = await api.client.put<IAnimal>(
      `${this.url}/${animalId}`,
      animal,
    );
    return response.data;
  }

  async uploadPicture(
    animalId: number,
    picture: ImagePickerAsset,
  ): Promise<void> {
    if (picture.base64) {
      const form = {
        file: {
          uri: picture.uri,
          name: picture.uri.split('/').pop(),
          type: 'image/jpeg',
          base64: picture.base64,
        },
      };
      await api.client.post(`${this.url}/${animalId}/files`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
    }
  }
}

export const animalApi = new AnimalApi();
