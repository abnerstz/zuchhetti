import { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios';

export const createMockAdapter = (): AxiosAdapter => {
  return async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    const url = (config.baseURL || '') + (config.url || '');
    const method = (config.method || 'get').toUpperCase();

    const response = await fetch(url, {
      method,
      headers: config.headers as HeadersInit,
      body: config.data ? JSON.stringify(config.data) : undefined,
    });

    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      config,
    } as AxiosResponse;
  };
};
