import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '@app/features/auth/slices';
import dashboardLecturesSlice from '@app/features/lecturer/dashboard/slices';
import dialogSlice from '../slices/dialogSlice';

const rootReducer = combineReducers({
  authState: authSlice,
  dialogState: dialogSlice,
  dashboardLecture: dashboardLecturesSlice,
});
export default rootReducer;
