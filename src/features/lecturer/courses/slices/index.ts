// src/features/courseDetail/courseDetailSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import {
  getListCourseOfLecture
} from './actions';
import { initialListCourseLectureScreenState } from './types';

const listCourseLectureSlice = createSlice({
  name: 'listCourseLecture',
  initialState: initialListCourseLectureScreenState,
  reducers: {
    setListCourse(state, action) {
        state.listCourse = action.payload;
    },
    reset: () => initialListCourseLectureScreenState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCourseOfLecture.pending, (state) => {
        state.listCourse.isLoadingGetListCourse = true;
      })
      .addCase(getListCourseOfLecture.fulfilled, (state, action) => {
        state.listCourse.isLoadingGetListCourse = false;
        state.listCourse.data = action.payload;
      })
      .addCase(getListCourseOfLecture.rejected, (state) => {
        state.listCourse.isLoadingGetListCourse = false;
      });
  },
});

export const {
  setListCourse,
  reset,
} = listCourseLectureSlice.actions;
export default listCourseLectureSlice.reducer;
