import { Center } from '../../models/CenterCourseModel';
import { CourseOffline } from '../../models/CourseOfflineModel';
import {
  CourseOnlineDetailModel,
  CourseOnlinePublishModel,
} from '../../models/CourseOnlinePublishModel';
import { OfflineCourse } from '../../models/OfflineCourseRequestModel';
import Room from '../../models/RoomCourseModel';

export type ScreenState = 'list' | 'add';

interface ListCourseOfflineState {
  listCourse: {
    isLoadingGetListCourse: boolean;
    data: CourseOffline[];
    page: number;
    pageSize: number;
    total: number;
  };
  listPublishCourses: {
    isLoadingPublishCourse: boolean;
    data: CourseOnlinePublishModel[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  screenState: ScreenState;
  activeStep: number;
  openCreateCourseInstructor: boolean;
  selectedCourseId?: number;
  selectedCourseDetail: {
    data: CourseOnlineDetailModel | null;
    isLoading: boolean;
  };
  centers: {
    isLoading: boolean;
    data: Center[];
  };
  totalForm: number[];
  rooms: {
    data: Room[];
    isLoadingGetRooms: boolean;
  };
  offlineCourseRequest: OfflineCourse | null;
}

const initialListCourseOfflineState: ListCourseOfflineState = {
  listCourse: {
    data: [],
    isLoadingGetListCourse: false,
    page: 1,
    pageSize: 10,
    total: 0,
  },
  listPublishCourses: {
    isLoadingPublishCourse: false,
    data: [],
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  },
  screenState: 'list',
  activeStep: 0,
  openCreateCourseInstructor: false,
  selectedCourseId: undefined,
  selectedCourseDetail: {
    data: null,
    isLoading: false,
  },
  centers: {
    isLoading: false,
    data: [],
  },
  totalForm: [0],
  rooms: {
    data: [],
    isLoadingGetRooms: false,
  },
  offlineCourseRequest: null,
};

export { initialListCourseOfflineState };
export type { ListCourseOfflineState };
