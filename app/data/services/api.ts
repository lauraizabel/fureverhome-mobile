import axios from 'axios';
import { ApisauceInstance, create } from 'apisauce';
import Config from '../../config';
import type { ApiConfig } from './api/api.types';

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

export class Api {
  apisauce: ApisauceInstance;

  private config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}

export const api = new Api();
