// src/features/courseDetail/courseDetailSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import {
  getLatestFeedbackLecturer,
  getLectureInfo,
  getReportData,
  getTopRateCourses,
} from './actions';
import { initialDashboardLectureScreenState } from './types';

const dashboardLecturesSlice = createSlice({
  name: 'dashboardLecture',
  initialState: initialDashboardLectureScreenState,
  reducers: {
    setPageTopRateCourse(state, action) {
      state.topRateCourses.page = action.payload;
    },
    setPageSizeTopRateCourse(state, action) {
      state.topRateCourses.pageSize = action.payload;
    },
    setIsLoadingEnrollCourse(state, action) {
      state.lectureInfo.isLoadingGetLecture = action.payload;
    },
    setPageFeedbacksLecturer(state, action) {
      state.latestFeedback.page = action.payload;
    },
    setPageSizeFeedbackLecturer(state, action) {
      state.latestFeedback.pageSize = action.payload;
    },
    setDataFeedback(state, action) {
      state.latestFeedback.data = action.payload;
    },
    reset: () => initialDashboardLectureScreenState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLectureInfo.pending, (state) => {
        state.isLoadingGetReport = true;
      })
      .addCase(getLectureInfo.fulfilled, (state, action) => {
        state.lectureInfo.isLoadingGetLecture = false;
        state.lectureInfo.info = action.payload;
      })
      .addCase(getLectureInfo.rejected, (state) => {
        state.lectureInfo.isLoadingGetLecture = false;
      });
    builder
      .addCase(getReportData.pending, (state) => {
        state.isLoadingGetReport = true;
      })
      .addCase(getReportData.fulfilled, (state, action) => {
        state.isLoadingGetReport = false;
        state.reportData = action.payload;
      })
      .addCase(getReportData.rejected, (state) => {
        state.isLoadingGetReport = false;
      });
    builder
      .addCase(getTopRateCourses.pending, (state) => {
        state.topRateCourses.isLoadingGetTopRateCourses = true;
      })
      .addCase(getTopRateCourses.fulfilled, (state, action) => {
        state.topRateCourses.isLoadingGetTopRateCourses = false;
        state.topRateCourses.data = action.payload?.data ?? [];
        state.topRateCourses.total = action.payload?.total ?? 0;
      })
      .addCase(getTopRateCourses.rejected, (state) => {
        state.topRateCourses.isLoadingGetTopRateCourses = false;
      });

    builder
      .addCase(getLatestFeedbackLecturer.pending, (state) => {
        state.latestFeedback.isLoadingGetLatestFeedback = true;
      })
      .addCase(getLatestFeedbackLecturer.fulfilled, (state, action) => {
        state.latestFeedback.isLoadingGetLatestFeedback = false;
        state.latestFeedback.data = action.payload?.data ?? [];
      })
      .addCase(getLatestFeedbackLecturer.rejected, (state) => {
        state.latestFeedback.isLoadingGetLatestFeedback = false;
      });
  },
});

export const {
  setIsLoadingEnrollCourse,
  setPageTopRateCourse,
  setPageSizeTopRateCourse,
  setPageFeedbacksLecturer,
  setPageSizeFeedbackLecturer,
  setDataFeedback,
  reset,
} = dashboardLecturesSlice.actions;
export default dashboardLecturesSlice.reducer;
