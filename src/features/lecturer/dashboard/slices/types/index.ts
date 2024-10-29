import LecturerProfileData from '../../models/LectureInfoModel';
import ReportData from '../../models/ReportDataModel';
import TopRatesCourseModel from '../../models/TopRatesCourseModel';

interface DashboardLectureScreenState {
  isLoadingGetReport: boolean;
  lectureInfo: {
    info: LecturerProfileData | undefined;
    isLoadingGetLecture: boolean;
  };
  reportData: ReportData | undefined;
  topRateCourses: {
    isLoadingGetTopRateCourses: boolean;
    data: TopRatesCourseModel[];
    page: number;
    pageSize: number;
    total: number;
  };
}

export const initialDashboardLectureScreenState: DashboardLectureScreenState = {
  isLoadingGetReport: false,
  lectureInfo: {
    info: undefined,
    isLoadingGetLecture: false,
  },
  reportData: undefined,
  topRateCourses: {
    data: [],
    isLoadingGetTopRateCourses: false,
    page: 0,
    pageSize: 5,
    total: 0,
  },
};
