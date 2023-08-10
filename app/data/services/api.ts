/* eslint-disable class-methods-use-this */
import Config from 'app/config';
import { QueryPagination } from 'app/core/pagination';
import { CustomApiProblem } from 'app/data/services/api/apiProblem';
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = Config.API_URL;

export class ApiClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.client.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        console.log({ error });
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response) {
          const { status, data } = error.response;
          console.log({ status, data }, error.response.request.body);
          throw new CustomApiProblem(
            'Error fetching data from the API',
            status,
            data,
          );
        } else if (error.request) {
          console.log('Request Error:', JSON.stringify(error.request));
        } else {
          console.error('Error:', { error });
        }

        return Promise.reject(error);
      },
    );
  }

  public buildQueryString(params: QueryPagination): string {
    return Object.keys(params)
      .map(key => {
        const value = params[key];
        if (value !== undefined) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return null;
      })
      .filter(Boolean)
      .join('&');
  }
}

export default new ApiClient();
