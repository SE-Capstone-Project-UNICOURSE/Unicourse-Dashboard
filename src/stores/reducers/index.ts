import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '@app/features/auth/slices';
import dashboardLecturesSlice from '@app/features/lecturer/dashboard/slices';
import listCourseLectureSlice from '@app/features/lecturer/courses/slices';
import dialogSlice from '../slices/dialogSlice';

const rootReducer = combineReducers({
  authState: authSlice,
  dialogState: dialogSlice,
  dashboardLecture: dashboardLecturesSlice,
  listCourseLecture: listCourseLectureSlice,
});
export default rootReducer;
