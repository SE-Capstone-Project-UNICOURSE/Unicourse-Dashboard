import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCategories,
  getCourseDetailById,
  getVideoVimeoWithAccessToken,
} from './actions';
import { initialCourseDetailScreenState } from './types';

const courseDetailSlice = createSlice({
  name: 'courseDetail',
  initialState: initialCourseDetailScreenState,
  reducers: {
    // Manage Course Detail data
    setCourseDetail(state, action) {
      state.courseDetail.data = action.payload;
    },
    setIsLoadingGetCourseDetail(state, action) {
      state.courseDetail.isLoadingGetCourseDetail = action.payload;
    },

    // Manage Categories
    setCategories(state, action) {
      state.categories.data = action.payload;
    },
    setFirstLoadCategories(state, action) {
      state.isFirstLoadCategory = action.payload;
    },

    // Manage Video type
    setVideoVimeo(state, action) {
      state.vimeoVideo.data = action.payload;
    },
    setPreviewImage: (state, action) => {
      state.previewImage = action.payload;
    },

    // Manage Dynamic Array
    setDynamicArrayItems(state, action) {
      const { fieldName, items } = action.payload;
      state.dynamicArrayFields[fieldName] = {
        items,
        errors: items.map((item) => item.trim() === ''),
        isValid: items.every((item) => item.trim() !== ''),
      };
    },
    addDynamicArrayItem(state, action: PayloadAction<string>) {
      const fieldName = action.payload;
      const field = state.dynamicArrayFields[fieldName];
      if (field) {
        field.items.push('');
        field.errors.push(false);
        field.isValid = false;
      }
    },
    removeDynamicArrayItem(state, action: PayloadAction<{ fieldName: string; index: number }>) {
      const { fieldName, index } = action.payload;
      const field = state.dynamicArrayFields[fieldName];
      if (field) {
        field.items.splice(index, 1);
        field.errors.splice(index, 1);
        field.isValid = field.items.every((item) => item.trim() !== '');
      }
    },
    updateDynamicArrayItem(state, action) {
      const { fieldName, index, value } = action.payload;
      const field = state.dynamicArrayFields[fieldName];
      if (field) {
        field.items[index] = value;
        field.errors[index] = value.trim() === '';
        field.isValid = field.items.every((item) => item.trim() !== '');
      }
    },
    resetDynamicArrayField(state, action: PayloadAction<string>) {
      const fieldName = action.payload;
      delete state.dynamicArrayFields[fieldName];
    },
    submitDynamicArrayField(state, action: PayloadAction<string>) {
      const fieldName = action.payload;
      const field = state.dynamicArrayFields[fieldName];
      if (field) {
        field.isValid = field.items.every((item) => item.trim() !== '');
        field.errors = field.items.map((item) => item.trim() === '');
      }
    },

    // Manage Tab State
    setActiveTab(state, action) {
      state.activeTab = action.payload
    },
    reset: () => initialCourseDetailScreenState
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
        state.isFirstLoadCategory = false;
        state.categories.data = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.categories.isLoadingGetCategories = false;
        state.isFirstLoadCategory = true;
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
  setPreviewImage,
  setDynamicArrayItems,
  addDynamicArrayItem,
  removeDynamicArrayItem,
  updateDynamicArrayItem,
  resetDynamicArrayField,
  submitDynamicArrayField,
  setActiveTab,
  reset,
} = courseDetailSlice.actions;

export default courseDetailSlice.reducer;