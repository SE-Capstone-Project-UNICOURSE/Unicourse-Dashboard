import type { AuthResponseData, DataResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { AUTH_API_PATH } from '../constants';

class AuthViewServices {
  // Get All Blogs
  public async loginToken(idToken: string): Promise<DataResponse<AuthResponseData>> {
    const response = await httpClient.post<DataResponse<AuthResponseData>>(AUTH_API_PATH.LOGIN, {
      id_token: idToken,
    });
    return response.data;
  }

  public async signIn(email: string, password: string): Promise<DataResponse<AuthResponseData>> {
    const response = await httpClient.post<DataResponse<AuthResponseData>>(
      `${AUTH_API_PATH.SIGN_IN}`,
      {
        email,
        password,
      }
    );

    return response.data;
  }

  public async signUp(
    email: string,
    password: string,
    fullName: string
  ): Promise<DataResponse<AuthResponseData>> {
    const response = await httpClient.post<DataResponse<AuthResponseData>>(
      `${AUTH_API_PATH.SIGN_UP}`,
      {
        email,
        password,
        full_name: fullName,
      }
    );
    return response.data;
  }

  public async logout(accessToken: string, refreshToken: string) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const body = {
      refresh_token: `Bearer ${refreshToken}`,
    };

    const response = await httpClient.post<DataResponse<any>>(AUTH_API_PATH.LOGOUT, body, config);

    return response.data;
  }
}

export default new AuthViewServices();
