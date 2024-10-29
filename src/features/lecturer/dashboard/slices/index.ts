// src/features/courseDetail/courseDetailSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getLectureInfo } from './actions';
import { initialDashboardLectureScreenState } from './types';

const dashboardLecturesSlice = createSlice({
  name: 'dashboardLecture',
  initialState: initialDashboardLectureScreenState,
  reducers: {
    setIsLoadingEnrollCourse(state, action) {
      state.isLoadingGetReport = action.payload;
    },
    reset: () => initialDashboardLectureScreenState,
  },
  extraReducers: (builder) => {
    builder.addCase(getLectureInfo.pending, (state) => {
      state.isLoadingGetReport = true;
    });
    builder.addCase(getLectureInfo.fulfilled, (state, action) => {
      state.isLoadingGetReport = false;
      state.lectureInfo.info = action.payload;
    });
    builder.addCase(getLectureInfo.rejected, (state) => {
      state.isLoadingGetReport = false;
    });
  },
});

export const { setIsLoadingEnrollCourse } = dashboardLecturesSlice.actions;
export default dashboardLecturesSlice.reducer;
