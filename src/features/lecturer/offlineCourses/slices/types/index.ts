import { Center } from '../../models/CenterCourseModel';
import CourseOfflineDetailResponseModel from '../../models/CourseOfflineDetailResponseModel';
import {
  CourseOnlineDetailModel,
  CourseOnlinePublishModel,
} from '../../models/CourseOnlinePublishModel';
import { OfflineCourseMentor } from '../../models/OfflineCourseMentorResponseModel';
import { OfflineCourse } from '../../models/OfflineCourseRequestModel';
import Room from '../../models/RoomCourseModel';

export type ScreenState = 'list' | 'add' | 'detail' | 'edit';

interface ListCourseOfflineState {
  listOfflineCourse: {
    isLoadingGetListOfflineCourse: boolean;
    data: OfflineCourseMentor[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    statusCourse: 'DRAFT' | 'PUBLISHED';
    sortByCreatedDate: 'desc' | 'asc';
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
  courseOfflineDetail: {
    isLoadingGetCourseOfflineDetail: boolean;
    data: CourseOfflineDetailResponseModel | null;
  };
  offlineCourseRequest: OfflineCourse | null;
  previewImage: string;
}

const initialListCourseOfflineState: ListCourseOfflineState = {
  listOfflineCourse: {
    isLoadingGetListOfflineCourse: false,
    data: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    statusCourse: 'DRAFT',
    sortByCreatedDate: 'desc',
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
  totalForm: [1],
  rooms: {
    data: [],
    isLoadingGetRooms: false,
  },
  courseOfflineDetail: {
    isLoadingGetCourseOfflineDetail: false,
    data: null,
  },
  offlineCourseRequest: null,
  previewImage: '',
};

export { initialListCourseOfflineState };
export type { ListCourseOfflineState };
