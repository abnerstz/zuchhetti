import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/lib/constants';
import { logger } from '@/lib/logger';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    logger.debug(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.debug(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    logger.error('[API Error]', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
    });

    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        logger.warn('Unauthorized - Token may be expired');
      } else if (status === 403) {
        logger.warn('Forbidden - Insufficient permissions');
      } else if (status === 404) {
        logger.warn('Resource not found');
      } else if (status >= 500) {
        logger.error('Server error - Please try again later');
      }
    } else if (error.request) {
      logger.error('No response received from server');
    } else {
      logger.error('Error setting up request');
    }

    return Promise.reject(error);
  }
);
