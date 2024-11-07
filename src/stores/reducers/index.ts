import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '@app/features/auth/slices';
import listCourseLectureSlice from '@app/features/lecturer/courses/slices';
import dashboardLecturesSlice from '@app/features/lecturer/dashboard/slices';
import listCourseOfflineLectureSlice from '@app/features/lecturer/offlineCourses/slices';
import dialogSlice from '../slices/dialogSlice';

const rootReducer = combineReducers({
  authState: authSlice,
  dialogState: dialogSlice,
  dashboardLecture: dashboardLecturesSlice,
  listCourseLecture: listCourseLectureSlice,
  listCourseOfflineLecture: listCourseOfflineLectureSlice,
});
export default rootReducer;
