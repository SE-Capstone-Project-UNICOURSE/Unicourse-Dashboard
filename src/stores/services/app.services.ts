import httpClient from '@utils/httpClient';
import { APP_COMMON_API_PATH } from 'src/constants/appConstants';
import type { AuthResponseData, DataResponse } from '../models';

class AppServices {
  private static instance: AppServices;

  //   private constructor() {}

  public static getInstance(): AppServices {
    if (!AppServices.instance) {
      AppServices.instance = new AppServices();
    }
    return AppServices.instance;
  }

  public async loginApi(
    idToken: string,
    signal: AbortSignal
  ): Promise<DataResponse<AuthResponseData>> {
    const response = await httpClient.post<DataResponse<AuthResponseData>>(
      APP_COMMON_API_PATH.LOGIN,
      { id_token: idToken },
      { signal }
    );
    return response.data;
  }
}

export default AppServices.getInstance();
