export type HTTPMethod = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";

export interface ILoadableReduxState {
  loading?: boolean;
  error?: IApiError;
}

export interface IValidationError {
  name: string;
  message: string;
}

export interface IApiErrorResponse {
  error: IApiError;
}

export interface IApiDeleteReponse {
  n: number;
  ok: number;
  deletedCount: number;
}

export interface IApiError {
  status: number;
  message: string;
  errors?: IValidationError[];
}

export interface IClearErrorAction<T> {
  type: T;
}

export function isApiErrorResponse(res: any): res is IApiErrorResponse {
  return (
    !!(res as IApiErrorResponse).error &&
    !!(res as IApiErrorResponse).error.status
  );
}
