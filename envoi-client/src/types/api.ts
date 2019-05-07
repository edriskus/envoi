export type HTTPMethod = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';

export interface ILoadableReduxState {
  loading?: boolean;
  error?: IApiError;
}

export interface IValidationError {
  name: string;
  message: string;
}

export interface IApiError {
  status: number,
  message: string,
  errors?: IValidationError[],
}

export interface IClearErrorAction<T> {
  type: T;
}