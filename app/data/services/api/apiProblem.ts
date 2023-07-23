import { ApiResponse } from 'apisauce';

export enum ApiError {
  CannotConnect = 'cannot-connect',
  Timeout = 'timeout',
  Server = 'server',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
  NotFound = 'not-found',
  Rejected = 'rejected',
  Unknown = 'unknown',
  BadData = 'bad-data',
}

export enum HttpStatus {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

export type GeneralApiProblem =
  | { error: ApiError.Timeout; message?: string }
  | { error: ApiError.CannotConnect; message?: string }
  | { error: ApiError.Server; message?: string }
  | { error: ApiError.Unauthorized; message?: string }
  | { error: ApiError.Forbidden; message?: string }
  | { error: ApiError.NotFound; message?: string }
  | { error: ApiError.Rejected; message?: string }
  | { error: ApiError.Unknown; message?: string }
  | { error: ApiError.BadData; message?: string };

export function getGeneralApiProblem({
  problem,
  status,
  data,
}: ApiResponse<any>): GeneralApiProblem {
  const message = data?.message;

  switch (problem) {
    case 'CONNECTION_ERROR':
      return { error: ApiError.CannotConnect, message };
    case 'NETWORK_ERROR':
      return { error: ApiError.CannotConnect, message };
    case 'TIMEOUT_ERROR':
      return { error: ApiError.Timeout, message };
    case 'SERVER_ERROR':
      return { error: ApiError.Server, message };
    case 'UNKNOWN_ERROR':
      return { error: ApiError.Unknown, message };
    case 'CLIENT_ERROR':
      switch (status) {
        case HttpStatus.Unauthorized:
          return { error: ApiError.Unauthorized, message };
        case HttpStatus.Forbidden:
          return { error: ApiError.Forbidden, message };
        case HttpStatus.NotFound:
          return { error: ApiError.NotFound, message };
        default:
          return { error: ApiError.Rejected, message };
      }
    case 'CANCEL_ERROR':
    default:
      return { error: ApiError.Unknown, message };
  }
}
