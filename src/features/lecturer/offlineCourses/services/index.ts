import type { DataResponse, PaginatedRequestParams, PaginateResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { OFFLINE_COURSE_LECTURER_API_PATH } from '../constants';
import { Center } from '../models/CenterCourseModel';
import CourseOfflineCreatedResponseModel from '../models/CourseOfflineCreatedResponseModel';
import CourseOfflineDetailResponseModel from '../models/CourseOfflineDetailResponseModel';
import { CourseOnlinePublishModel } from '../models/CourseOnlinePublishModel';
import { OfflineCourseMentor } from '../models/OfflineCourseMentorResponseModel';
import { OfflineCourse } from '../models/OfflineCourseRequestModel';
import Room from '../models/RoomCourseModel';

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

  public async getRooms(
    accessToken: string,
    centerId: number,
    fromDate: string,
    toDate: string
  ): Promise<DataResponse<Room[]>> {
    const route = `${OFFLINE_COURSE_LECTURER_API_PATH.GET_CENTER}/${centerId}?from=${fromDate}&to=${toDate}`;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<Room[]>>(route, config);

    return response.data;
  }

  public async createOfflineCourses(
    accessToken: string,
    courseOffline: OfflineCourse
  ): Promise<DataResponse<CourseOfflineCreatedResponseModel>> {
    const route = OFFLINE_COURSE_LECTURER_API_PATH.CREATE_COURSE_OFFLINE;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.post<DataResponse<CourseOfflineCreatedResponseModel>>(
      route,
      courseOffline,
      config
    );

    return response.data;
  }

  public async getListOfflineCourses(
    accessToken: string,
    request: PaginatedRequestParams
  ): Promise<DataResponse<PaginateResponse<OfflineCourseMentor[]>>> {
    const route = OFFLINE_COURSE_LECTURER_API_PATH.GET_LIST_OFFLINE_COURSE;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.post<DataResponse<PaginateResponse<OfflineCourseMentor[]>>>(
      route,
      request,
      config
    );
    return response.data;
  }

  public async getCourseOfflineDetail(
    accessToken: string,
    courseMentorId: number
  ): Promise<DataResponse<CourseOfflineDetailResponseModel>> {
    const route = `${OFFLINE_COURSE_LECTURER_API_PATH.GET_OFFLINE_COURSE_DETAIL}/${courseMentorId}`;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<CourseOfflineDetailResponseModel>>(
      route,
      config
    );
    return response.data;
  }
}

export default new LectureOfflineCourseServices();
