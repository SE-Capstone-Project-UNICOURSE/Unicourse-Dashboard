import { createSlice } from '@reduxjs/toolkit';
import {
  getCategories,
  getCourseDetailById,
  getVideoVimeoWithAccessToken
} from './actions';
import { initialCourseDetailScreenState } from './types';

const courseDetailSlice = createSlice({
  name: 'courseDetail',
  initialState: initialCourseDetailScreenState,
  reducers: {
    setCourseDetail(state, action) {
        state.courseDetail.data = action.payload;
    },
    setIsLoadingGetCourseDetail(state, action) {
        state.courseDetail.isLoadingGetCourseDetail = action.payload;
    },
    setCategories(state, action) {
        state.categories.data = action.payload;
    },
    setFirstLoadCategories(state, action) {
        state.isFirstLoadCategory = action.payload;
    },
    setVideoVimeo(state, action) {
      state.vimeoVideo.data = action.payload;
    },
    reset: () => initialCourseDetailScreenState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseDetailById.pending, (state) => {
        state.courseDetail.isLoadingGetCourseDetail = true;
      })
      .addCase(getCourseDetailById.fulfilled, (state, action) => {
        state.courseDetail.isLoadingGetCourseDetail = false;
        state.courseDetail.data = action.payload;
      })
      .addCase(getCourseDetailById.rejected, (state) => {
        state.courseDetail.isLoadingGetCourseDetail = false;
      });
    builder
      .addCase(getCategories.pending, (state) => {
        state.categories.isLoadingGetCategories = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.isLoadingGetCategories = false;
        state.categories.data = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categories.isLoadingGetCategories = false;
      });
    builder
      .addCase(getVideoVimeoWithAccessToken.pending, (state) => {
        state.vimeoVideo.isLoadingVimeoVideo = true;
      })
      .addCase(getVideoVimeoWithAccessToken.fulfilled, (state, action) => {
        state.vimeoVideo.isLoadingVimeoVideo = false;
        state.vimeoVideo.data = action.payload;
      })
      .addCase(getVideoVimeoWithAccessToken.rejected, (state) => {
        state.vimeoVideo.isLoadingVimeoVideo = false;
      });
  },
});

export const {
  setCourseDetail,
  setIsLoadingGetCourseDetail,
  setCategories,
  setFirstLoadCategories,
  setVideoVimeo,
  reset,
} = courseDetailSlice.actions;
export default courseDetailSlice.reducer;
