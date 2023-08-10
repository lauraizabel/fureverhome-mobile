/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import api from 'app/data/services/api';
import { Page } from 'app/core/pagination';
import type { ApiConfig } from '../api/api.types';
import { IOng } from '../../models/Ong';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export class OngApi {
  private readonly url = '/users';

  async loadOngs(): Promise<Page<IOng>> {
    const response = await api.client.get<Page<IOng>>(`${this.url}/ongs`);
    return response.data;
  }
}

export const ongApi = new OngApi();
