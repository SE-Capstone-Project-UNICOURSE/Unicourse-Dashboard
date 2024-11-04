import { Course } from '../../models';
import PaginateResponse from '@app/common/models/PaginateResponse';

export interface ListCourseLectureScreenState {
  listCourse: {
    isLoadingGetListCourse: boolean;
    data: PaginateResponse<Array<Course>> | undefined;
  };
}

export const initialListCourseLectureScreenState: ListCourseLectureScreenState = {
  listCourse: {
    data: undefined,
    isLoadingGetListCourse: false,
  },
};
