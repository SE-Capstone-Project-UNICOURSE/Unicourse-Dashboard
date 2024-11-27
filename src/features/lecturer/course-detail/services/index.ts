import type { DataResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { COURSE_DETAIL_LECTURE_API_PATH, TOPIC_VIDEO_API_PATH } from '../constants';
import { Category, Course } from '../models';
import { Vimeo } from '../models/TopicVideo';
import cryptoJSService from './cryptoJSService';

class CourseDetailLecturerViewServices {
  public async getCourseDetailById(
    accessToken: string,
    courseId: number
  ): Promise<DataResponse<Course>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<Course>>(
      `${COURSE_DETAIL_LECTURE_API_PATH.GET_COURSE_DETAIL}/${courseId}`,
      config
    );

    return response.data;
  }

  public async getCategories(): Promise<DataResponse<Array<Category>>> {
    const response = await httpClient.get<DataResponse<Array<Category>>>(
      `${COURSE_DETAIL_LECTURE_API_PATH.GET_CATEGORIES}`
    );
    return response.data;
  }

  public async getVimeoVideoPreview(
    id: string,
    width: number,
    height: number
  ): Promise<DataResponse<Vimeo>> {
    const response = await httpClient.get(
      `${TOPIC_VIDEO_API_PATH.GET_PREVIEW}/${id}?width=${width}&height=${height}`
    );
    return response.data;
  }

  public async getVimeoVideoWithAccessToken(
    accessToken,
    videoUrl: string,
    width: number,
    height: number
  ): Promise<DataResponse<Vimeo>> {
    const config: AxiosRequestConfig = {
      headers: {
        'X-Encrypted-Video-ID': cryptoJSService.encrypt(videoUrl),
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get(
      `${TOPIC_VIDEO_API_PATH.GET_VIDEO_WITH_ACCESS_TOKEN}/?width=${width}&height=${height}`,
      config
    );
    return response.data;
  }
}

export default new CourseDetailLecturerViewServices();
