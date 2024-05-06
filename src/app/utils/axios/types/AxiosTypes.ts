import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

export interface Iparams {
  pageSize?: number;
  page?: number;
  filters?: string;
  sort?: string;
}
export interface IListOption<T> {
  data: T[];
  pageSize: number;
  page: number;
  lastPage: number;
  total: number;
}
export interface RequestAxiosResource {
  $get(id: number | string): Promise<AxiosResponse>;
  $save(obj: object): Promise<AxiosResponse>;
  $query(params?: any): Promise<AxiosResponse>;
  $update(id: number | string | string[], obj: object): Promise<AxiosResponse>;
  $delete(id: number | string): Promise<AxiosResponse>;
  $logs(id: number | string): Promise<AxiosResponse>;
}
export interface RequestAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>;
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $resource<T>(path: string, actions?: T): RequestAxiosResource;
  setHeader(
    name: string,
    value?: string | false,
    scopes?: string | string[]
  ): void;
  setToken(
    token: string | false,
    type?: string,
    scopes?: string | string[]
  ): void;

  onRequest(callback: (config: AxiosRequestConfig) => void): void;
  onResponse<T = any>(callback: (response: AxiosResponse<T>) => void): void;
  onError(callback: (error: AxiosError) => void): void;
  onRequestError(callback: (error: AxiosError) => void): void;
  onResponseError(callback: (error: AxiosError) => void): void;
}
