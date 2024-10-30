import type { DataResponse, PaginateResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { DASHBOARD_LECTURE_API_PATH } from '../constants';
import LectureFeedbackCourseModel, {
  LectureFeedbackCourseRequestModel,
} from '../models/LectureFeedbackCourseModel';
import type LecturerProfileData from '../models/LectureInfoModel';
import ReportData from '../models/ReportDataModel';
import TopRatesCourseModel, { TopRatesCourseRequestModel } from '../models/TopRatesCourseModel';

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

  public async getReportData(
    accessToken: string,
    filterBy: string
  ): Promise<DataResponse<ReportData>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<ReportData>>(
      `${DASHBOARD_LECTURE_API_PATH.GET_REPORT_DATA}?filterBy=${filterBy}`,
      config
    );

    return response.data;
  }

  public async getTopRatesCourse(
    accessToken: string,
    request: TopRatesCourseRequestModel
  ): Promise<DataResponse<PaginateResponse<TopRatesCourseModel[]>>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.post<DataResponse<PaginateResponse<TopRatesCourseModel[]>>>(
      `${DASHBOARD_LECTURE_API_PATH.GET_TOP_RATES_COURSE}`,
      request,
      config
    );

    return response.data;
  }

  public async getLatestFeedback(
    accessToken: string,
    request: LectureFeedbackCourseRequestModel
  ): Promise<DataResponse<PaginateResponse<LectureFeedbackCourseModel[]>>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.post<
      DataResponse<PaginateResponse<LectureFeedbackCourseModel[]>>
    >(`${DASHBOARD_LECTURE_API_PATH.GET_LATEST_FEEDBACK_LECTURER}`, request, config);

    return response.data;
  }
}

export default new LectureDashboardViewServices();
