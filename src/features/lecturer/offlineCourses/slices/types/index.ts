import { CourseOffline } from '../../models/CourseOfflineModel';

export type ScreenState = 'list' | 'add';

interface ListCourseOfflineState {
  listCourse: {
    isLoadingGetListCourse: boolean;
    data: CourseOffline[];
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
  screenState: ScreenState;
  activeStep: number;
}

const initialListCourseOfflineState: ListCourseOfflineState = {
  listCourse: {
    data: [],
    isLoadingGetListCourse: false,
    page: 1,
    pageSize: 10,
    hasMore: true,
  },
  screenState: 'list',
  activeStep: 0,
};

export { initialListCourseOfflineState };
export type { ListCourseOfflineState };
