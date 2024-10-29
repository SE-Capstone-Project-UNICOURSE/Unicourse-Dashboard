import LecturerProfileData from '../../models/LectureInfoModel';

interface DashboardLectureScreenState {
  isLoadingGetReport: boolean;
  lectureInfo: {
    info: LecturerProfileData | undefined;
    isLoadingGetLecture: boolean;
  };
}

export const initialDashboardLectureScreenState: DashboardLectureScreenState = {
  isLoadingGetReport: false,
  lectureInfo: {
    info: undefined,
    isLoadingGetLecture: false,
  },
};
