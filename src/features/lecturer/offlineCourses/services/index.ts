import type { DataResponse, PaginatedRequestParams, PaginateResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { OFFLINE_COURSE_LECTURER_API_PATH } from '../constants';
import { Center } from '../models/CenterCourseModel';
import { CourseOnlinePublishModel } from '../models/CourseOnlinePublishModel';

class LectureOfflineCourseServices {
  public async getPublishCourses(
    accessToken: string,
    request: PaginatedRequestParams
  ): Promise<DataResponse<PaginateResponse<CourseOnlinePublishModel[]>>> {
    const route = `${OFFLINE_COURSE_LECTURER_API_PATH.GET_PUBLISH_COURSES}`;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.post<
      DataResponse<PaginateResponse<CourseOnlinePublishModel[]>>
    >(route, request, config);

    return response.data;
  }

  public async getDetailCourse(courseId: number): Promise<DataResponse<CourseOnlinePublishModel>> {
    const route = `${OFFLINE_COURSE_LECTURER_API_PATH.GET_DETAIL_COURSE}/${courseId}`;
    const response = await httpClient.get<DataResponse<CourseOnlinePublishModel>>(route);

    return response.data;
  }

  public async getCenters(accessToken: string): Promise<DataResponse<Center[]>> {
    const route = `${OFFLINE_COURSE_LECTURER_API_PATH.GET_CENTER}`;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<Center[]>>(route, config);

    return response.data;
  }
}

export default new LectureOfflineCourseServices();
