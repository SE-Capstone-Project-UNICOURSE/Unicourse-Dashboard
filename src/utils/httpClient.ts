/* eslint-disable @typescript-eslint/return-await */
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN, TIMEOUT } from '@app/common/constants/appConstants';
import { store } from '@app/stores';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

class HttpClient {
  private static instance: HttpClient;

  private client: AxiosInstance;

  private isRefreshing = false;

  private refreshSubscribers: Array<(token: string) => void> = [];

  private constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            originalRequest._retry = true;

            try {
              const refreshToken = localStorage.getItem(REFRESH_TOKEN);
              if (!refreshToken) throw new Error('No refresh token available');

              const response = await this.refreshToken(refreshToken);
              const newAccessToken = response.data.accessToken;

              localStorage.setItem(ACCESS_TOKEN, newAccessToken);
              this.onTokenRefreshed(newAccessToken);

              return await this.client(originalRequest);
            } catch (refreshError) {
              this.showSignInDialog('Session expired. Please sign in again.');
              return Promise.reject(refreshError);
            } finally {
              this.isRefreshing = false;
            }
          }

          return new Promise((resolve) => {
            this.subscribeTokenRefresh((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(this.client(originalRequest));
            });
          });
        }

        // Global error handling for other errors
        if (!error.response || error.response.status >= 500) {
          this.showErrorDialog(
            'Cannot connect to the server. Please check your internet connection or try again later.'
          );
        } else {
          this.showErrorDialog(
            error.response?.data?.message || 'Something went wrong. Please try again later.'
          );
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(refreshToken: string): Promise<AxiosResponse<any>> {
    return axios.post(`${BASE_URL}/api/auth/refresh-token`, {
      refresh_token: refreshToken,
    });
  }

  private subscribeTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  private onTokenRefreshed(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private showErrorDialog(message: string): void {
    store.dispatch(
      showDialog({
        title: 'Error',
        content: message,
        type: DialogType.ERROR,
        onConfirm: () => {
          store.dispatch(hideDialog());
        },
      })
    );
  }

  private showSignInDialog(message: string): void {
    store.dispatch(
      showDialog({
        title: 'Session Expired',
        content: message,
        type: DialogType.WARNING,
        onConfirm: () => {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          store.dispatch(hideDialog());
          window.location.href = '/sign-in';
        },
      })
    );
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export default HttpClient.getInstance();
