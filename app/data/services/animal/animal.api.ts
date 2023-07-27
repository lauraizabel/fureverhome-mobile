import Config from 'app/config';
import api from 'app/data/services/api';
import { IAnimal } from 'app/data/models';
import type { ApiConfig } from '../api/api.types';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export class AnimalApi {
  private readonly url = '/animals';

  async getAllAnimal(): Promise<IAnimal[]> {
    const response = await api.client.get<IAnimal[]>(this.url);

    return response.data as IAnimal[];
  }

  async getAnimalByUser(userId: number): Promise<IAnimal[]> {
    const response = await api.client.get<IAnimal[]>(
      `${this.url}/user/${userId}`,
    );
    return response.data;
  }
}

export const animalApi = new AnimalApi();
