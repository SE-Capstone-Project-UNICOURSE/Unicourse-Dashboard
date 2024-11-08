import type { DataResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { COURSE_DETAIL_LECTURE_API_PATH } from '../constants';
import { Category, Course } from '../models';

class CourseDetailLecturerViewServices {
    public async getCourseDetailById(accessToken: string, courseId: number): Promise<DataResponse<Course>> {
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
        const response = await httpClient.get<DataResponse<Array<Category>>>(`${COURSE_DETAIL_LECTURE_API_PATH.GET_CATEGORIES}`);
        return response.data;
    }

}

export default new CourseDetailLecturerViewServices();
