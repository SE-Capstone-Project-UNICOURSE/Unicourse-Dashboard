import { combineReducers } from '@reduxjs/toolkit';
import appSlice from '../slices/appSlice';

const rootReducer = combineReducers({
  appState: appSlice,
});
export default rootReducer;
