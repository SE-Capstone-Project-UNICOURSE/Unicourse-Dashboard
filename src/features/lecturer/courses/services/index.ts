import type { DataResponse, PaginateResponse, SearchRequestModel } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import { LIST_COURSE_LECTURE_API_PATH } from '../constants';
import { Course } from '../models';

class LectureListCourseViewServices {
    public async getListCourseOfLecture(
        accessToken: string,
        lectureId: number,
        filter: SearchRequestModel
    ): Promise<DataResponse<PaginateResponse<Array<Course>>>> {
        const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        };
    
        const response = await httpClient.get<DataResponse<PaginateResponse<Array<Course>>>>(
        `${LIST_COURSE_LECTURE_API_PATH.GET_ALL_COURSES}/${lectureId}/get-all-courses?page=${filter.page}&limit=${filter.limit}`,
        config
        );
    
        return response.data;
    }
}

export default new LectureListCourseViewServices();
