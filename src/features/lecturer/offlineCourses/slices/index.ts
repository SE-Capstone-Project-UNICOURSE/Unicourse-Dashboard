// src/features/courseDetail/courseDetailSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PaginateResponse } from '@app/stores/models';
import { CourseOnlinePublishModel } from '../models/CourseOnlinePublishModel';
import { OfflineCourseMentor } from '../models/OfflineCourseMentorResponseModel';
import { OfflineCourse } from '../models/OfflineCourseRequestModel';
import {
  getCenters,
  getCourseDetail,
  getCourseOfflineDetail,
  getOfflineCourseMentor,
  getPublishCourses,
  getRooms,
} from './actions';
import { initialListCourseOfflineState, ScreenState } from './types';

const listCourseOfflineLectureSlice = createSlice({
  name: 'listCourseOfflineLecture',
  initialState: initialListCourseOfflineState,
  reducers: {
    setScreenState(state, action: PayloadAction<ScreenState>) {
      state.screenState = action.payload;
    },
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
    setActiveEditStep(state, action) {
      state.activeEditStep = action.payload;
    },
    setOnlineActiveCoursePage(state, action) {
      state.listPublishCourses.page = action.payload;
    },
    setCreateCourseInstruction(state, action) {
      state.openCreateCourseInstructor = action.payload;
    },
    setEditCourseInstruction(state, action) {
      state.openEditCourseInstructior = action.payload;
    },
    setCourseOfflineDetail(state, action) {
      state.courseOfflineDetail.data = action.payload;
    },
    setSelectedCourseId(state, action) {
      state.selectedCourseId = action.payload;
    },
    setSelectedCourseEditId(state, action) {
      state.selectedCourseEditId = action.payload;
    },
    setTotalForm: (state, action) => {
      state.totalForm = action.payload;
    },
    setTotalEditForm: (state, action) => {
      state.totalEditForm = action.payload;
    },
    setOfflineCourseRequest: (state, action: PayloadAction<OfflineCourse>) => {
      state.offlineCourseRequest = action.payload;
    },
    setSelectedCourseData: (state, action) => {
      state.selectedCourseDetail.data = action.payload;
    },
    // For List Offline Course Mentor
    setPageOfflineCourse: (state, action) => {
      state.listOfflineCourse.page = action.payload;
    },
    setOfflineCourseStatus: (state, action) => {
      state.listOfflineCourse.statusCourse = action.payload;
    },
    setPreviewImage: (state, action) => {
      state.previewImage = action.payload;
    },
    resetCourseOfflineLectureState: () => initialListCourseOfflineState,
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

    builder
      .addCase(getCenters.pending, (state) => {
        state.centers.isLoading = true;
      })
      .addCase(getCenters.fulfilled, (state, action) => {
        state.centers.isLoading = false;
        state.centers.data = action.payload;
      })
      .addCase(getCenters.rejected, (state) => {
        state.centers.isLoading = false;
      });

    builder
      .addCase(getRooms.pending, (state) => {
        state.rooms.isLoadingGetRooms = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms.isLoadingGetRooms = false;
        state.rooms.data = action.payload ?? [];
      })
      .addCase(getRooms.rejected, (state) => {
        state.rooms.isLoadingGetRooms = false;
      });
    builder
      .addCase(getOfflineCourseMentor.pending, (state) => {
        state.listOfflineCourse.isLoadingGetListOfflineCourse = true;
      })
      .addCase(
        getOfflineCourseMentor.fulfilled,
        (state, action: PayloadAction<PaginateResponse<OfflineCourseMentor[]>>) => {
          state.listOfflineCourse.isLoadingGetListOfflineCourse = false;
          state.listOfflineCourse.data = action.payload.data ?? [];
          state.listOfflineCourse.total = action.payload.total ?? 0;
          state.listOfflineCourse.totalPages = action.payload.totalPages ?? 0;
        }
      )
      .addCase(getOfflineCourseMentor.rejected, (state) => {
        state.listOfflineCourse.isLoadingGetListOfflineCourse = false;
      });
    builder
      .addCase(getCourseOfflineDetail.pending, (state) => {
        state.courseOfflineDetail.isLoadingGetCourseOfflineDetail = true;
      })
      .addCase(getCourseOfflineDetail.fulfilled, (state, action) => {
        state.courseOfflineDetail.data = action.payload;
        state.courseOfflineDetail.isLoadingGetCourseOfflineDetail = false;
      })
      .addCase(getCourseOfflineDetail.rejected, (state) => {
        state.courseOfflineDetail.isLoadingGetCourseOfflineDetail = false;
      });
  },
});

export const {
  resetCourseOfflineLectureState,
  setScreenState,
  setActiveStep,
  setOnlineActiveCoursePage,
  setCreateCourseInstruction,
  setEditCourseInstruction,
  setSelectedCourseId,
  setTotalForm,
  setTotalEditForm,
  setOfflineCourseRequest,
  setPageOfflineCourse,
  setOfflineCourseStatus,
  setPreviewImage,
  setActiveEditStep,
  setSelectedCourseEditId,
  setCourseOfflineDetail,
  setSelectedCourseData,
} = listCourseOfflineLectureSlice.actions;
export default listCourseOfflineLectureSlice.reducer;
