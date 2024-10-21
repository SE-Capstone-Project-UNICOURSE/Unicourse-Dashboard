import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '@app/features/auth/slices';
import appSlice from '../slices/appSlice';
import dialogSlice from '../slices/dialogSlice';

const rootReducer = combineReducers({
  appState: appSlice,
  authState: authSlice,
  dialogState: dialogSlice,
});
export default rootReducer;
