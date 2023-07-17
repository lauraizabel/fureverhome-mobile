import { IAuthentication } from 'app/data/models/Authentication';

export type LoginResponse = IAuthentication;

export interface ApiConfig {
  url: string;

  timeout: number;
}
