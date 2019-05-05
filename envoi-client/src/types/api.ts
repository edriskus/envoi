export type HTTPMethod = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';

export interface ILoadableReduxState {
  loading?: boolean;
  error?: IApiError;
}

export interface IApiError {
  status: number,
  message: string,
  errors?: string[],
}

export interface IClearErrorAction<T> {
  type: T;
}