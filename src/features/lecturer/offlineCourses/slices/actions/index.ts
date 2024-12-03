import ErrorResponse from '@app/common/models/ErrorResponse';
import { PaginatedRequestParams } from '@app/stores/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import offlineLectureCourseServices from '../../services';

export const getPublishCourses = createAsyncThunk<
  any,
  { accessToken: string; request: PaginatedRequestParams },
  { rejectValue: ErrorResponse }
>('offlineLectures/getPublishCourses', async ({ accessToken, request }, { rejectWithValue }) => {
  try {
    const response = await offlineLectureCourseServices.getPublishCourses(accessToken, request);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue({
        message: error.response.data.message,
        statusCode: error.response.status,
        errorCode: error.response.data.errorCode,
      });
    }
    return rejectWithValue({
      message: 'Fail to get publish courses! please try again!',
      statusCode: 500,
    });
  }
});

export const getCourseDetail = createAsyncThunk<
  any,
  { courseId: number },
  { rejectValue: ErrorResponse }
>('offlineLectures/getCourseDetail', async ({ courseId }, { rejectWithValue }) => {
  try {
    const response = await offlineLectureCourseServices.getDetailCourse(courseId);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue({
        message: error.response.data.message,
        statusCode: error.response.status,
        errorCode: error.response.data.errorCode,
      });
    }
    return rejectWithValue({
      message: 'Fail to get publish courses! please try again!',
      statusCode: 500,
    });
  }
});

export const getCenters = createAsyncThunk<
  any,
  { accessToken: string },
  { rejectValue: ErrorResponse }
>('offlineLectures/getCenters', async ({ accessToken }, { rejectWithValue }) => {
  try {
    const response = await offlineLectureCourseServices.getCenters(accessToken);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue({
        message: error.response.data.message,
        statusCode: error.response.status,
        errorCode: error.response.data.errorCode,
      });
    }
    return rejectWithValue({
      message: 'Fail to get centers! please try again!',
      statusCode: 500,
    });
  }
});

export const getRooms = createAsyncThunk(
  'offlineLectures/gerRooms',
  async (
    {
      accessToken,
      centerId,
      fromDate,
      toDate,
    }: { accessToken: string; centerId: number; fromDate: string; toDate: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await offlineLectureCourseServices.getRooms(
        accessToken,
        centerId,
        fromDate,
        toDate
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({
          message: error.response.data.message,
          statusCode: error.response.status,
          errorCode: error.response.data.errorCode,
        });
      }
      return rejectWithValue({
        message: 'Fail to get centers! please try again!',
        statusCode: 500,
      });
    }
  }
);

export const getOfflineCourseMentor = createAsyncThunk<
  any,
  { accessToken: string; request: PaginatedRequestParams },
  { rejectValue: ErrorResponse }
>(
  'offlineLectures/getOfflineCourseMentors',
  async ({ accessToken, request }, { rejectWithValue }) => {
    try {
      const response = await offlineLectureCourseServices.getListOfflineCourses(
        accessToken,
        request
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({
          message: error.response.data.message,
          statusCode: error.response.status,
          errorCode: error.response.data.errorCode,
        });
      }
      return rejectWithValue({
        message: 'Failed to fetch offline courses. Please try again later.',
        statusCode: 500,
      });
    }
  }
);

export const getCourseOfflineDetail = createAsyncThunk<
  any,
  { accessToken: string; courseMentorId: number },
  { rejectValue: ErrorResponse }
>(
  'offlineLectures/getCourseOfflineDetail',
  async ({ accessToken, courseMentorId }, { rejectWithValue }) => {
    try {
      const response = await offlineLectureCourseServices.getCourseOfflineDetail(
        accessToken,
        courseMentorId
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({
          message: error.response.data.message,
          statusCode: error.response.status,
          errorCode: error.response.data.errorCode,
        });
      }
      return rejectWithValue({
        message: 'Failed to fetch offline course detail. Please try again later.',
        statusCode: 500,
      });
    }
  }
);
