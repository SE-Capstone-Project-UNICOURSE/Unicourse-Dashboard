import type { DataResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { DASHBOARD_LECTURE_API_PATH } from '../constants';
import type LecturerProfileData from '../models/LectureInfoModel';

class LectureDashboardViewServices {
  public async getLectureById(
    accessToken: string,
    lectureId: number
  ): Promise<DataResponse<LecturerProfileData>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<any>>(
      `${DASHBOARD_LECTURE_API_PATH.GET_LECTURE_BY_ID}/${lectureId}`,
      config
    );

    return response.data;
  }
}

export default new LectureDashboardViewServices();
