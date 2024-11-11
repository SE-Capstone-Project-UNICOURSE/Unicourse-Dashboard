// src/features/courseDetail/courseDetailSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PaginateResponse } from '@app/stores/models';
import { CourseOnlinePublishModel } from '../models/CourseOnlinePublishModel';
import { getCenters, getCourseDetail, getPublishCourses } from './actions';
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
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
    setOnlineActiveCoursePage(state, action) {
      state.listPublishCourses.page = action.payload;
    },
    setCreateCourseInstruction(state, action) {
      state.openCreateCourseInstructor = action.payload;
    },
    setSelectedCourseId(state, action) {
      state.selectedCourseId = action.payload;
    },
    reset: () => initialListCourseOfflineState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublishCourses.pending, (state) => {
        state.listPublishCourses.isLoadingPublishCourse = true;
      })
      .addCase(
        getPublishCourses.fulfilled,
        (state, action: PayloadAction<PaginateResponse<CourseOnlinePublishModel[]>>) => {
          state.listPublishCourses.isLoadingPublishCourse = false;
          state.listPublishCourses.data = action.payload.data ?? [];
          state.listPublishCourses.total = action.payload.total;
          state.listPublishCourses.totalPages = action.payload.totalPages;
        }
      )
      .addCase(getPublishCourses.rejected, (state) => {
        state.listPublishCourses.isLoadingPublishCourse = false;
      });

    builder
      .addCase(getCourseDetail.pending, (state) => {
        state.selectedCourseDetail.isLoading = true;
      })
      .addCase(getCourseDetail.fulfilled, (state, action) => {
        state.selectedCourseDetail.isLoading = false;
        state.selectedCourseDetail.data = action.payload;
      })
      .addCase(getCourseDetail.rejected, (state) => {
        state.selectedCourseDetail.isLoading = false;
      });

    builder.addCase(getCenters.pending, (state) => {
      state.centers.isLoading = true;
    });
    builder.addCase(getCenters.fulfilled, (state, action) => {
      state.centers.isLoading = false;
      state.centers.data = action.payload;
    });
    builder.addCase(getCenters.rejected, (state) => {
      state.centers.isLoading = false;
    });
  },
});

export const {
  setIsLoadingListCourse,
  setListCourse,
  reset,
  setScreenState,
  setActiveStep,
  setOnlineActiveCoursePage,
  setCreateCourseInstruction,
  setSelectedCourseId,
} = listCourseOfflineLectureSlice.actions;
export default listCourseOfflineLectureSlice.reducer;
