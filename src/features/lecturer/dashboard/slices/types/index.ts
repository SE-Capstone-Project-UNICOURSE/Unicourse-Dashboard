import LectureFeedbackCourseModel from '../../models/LectureFeedbackCourseModel';
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
  latestFeedback: {
    isLoadingGetLatestFeedback: boolean;
    data: LectureFeedbackCourseModel[];
    page: number;
    pageSize: number;
    total: number;
  };
  labelDataReport: string[];
  totalAmountTransactionForLabelDataReport: number[];
  totalEnrolledForLabelDataReport: number[];
  totalFeedbackForLabelDataReport: number[];
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
  latestFeedback: {
    data: [],
    isLoadingGetLatestFeedback: false,
    page: 0,
    pageSize: 5,
    total: 0,
  },
  labelDataReport: [],
  totalAmountTransactionForLabelDataReport: [],
  totalEnrolledForLabelDataReport: [],
  totalFeedbackForLabelDataReport: [],
};
