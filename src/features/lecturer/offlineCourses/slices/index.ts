// src/features/courseDetail/courseDetailSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialListCourseOfflineState, ScreenState } from './types';

const listCourseOfflineLectureSlice = createSlice({
  name: 'listCourseOfflineLecture',
  initialState: initialListCourseOfflineState,
  reducers: {
    setIsLoadingListCourse(state, action) {
      state.listCourse = action.payload;
    },
    setScreenState(state, action: PayloadAction<ScreenState>) {
      state.screenState = action.payload;
    },
    setListCourse(state, action) {
      state.listCourse = action.payload;
    },
    reset: () => initialListCourseOfflineState,
  },
  extraReducers: (builder) => {},
});

export const { setIsLoadingListCourse, setListCourse, reset, setScreenState } =
  listCourseOfflineLectureSlice.actions;
export default listCourseOfflineLectureSlice.reducer;
