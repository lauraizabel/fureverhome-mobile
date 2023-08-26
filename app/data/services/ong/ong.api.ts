/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import api from 'app/data/services/api';
import type { ApiConfig } from '../api/api.types';
import { IOng } from '../../models/Ong';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export interface OngQuery {
  name?: string;
}

export class OngApi {
  private readonly url = '/users';

  async loadOngs(query?: OngQuery): Promise<IOng[]> {
    if (!query) {
      query = {};
    }

    const response = await api.client.get<IOng[]>(
      `${this.url}/ongs?${api.buildQueryString(query)}`,
    );
    return response.data;
  }
}

export const ongApi = new OngApi();
