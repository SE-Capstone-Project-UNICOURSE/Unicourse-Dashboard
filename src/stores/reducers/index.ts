import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '@app/features/auth/slices';
import dialogSlice from '../slices/dialogSlice';

const rootReducer = combineReducers({
  authState: authSlice,
  dialogState: dialogSlice,
});
export default rootReducer;
