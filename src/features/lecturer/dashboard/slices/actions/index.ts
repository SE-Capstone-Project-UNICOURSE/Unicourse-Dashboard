import ErrorResponse from '@app/common/models/ErrorResponse';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LectureFeedbackCourseRequestModel } from '../../models/LectureFeedbackCourseModel';
import { TopRatesCourseRequestModel } from '../../models/TopRatesCourseModel';
import dashboardLectureServices from '../../services';

export const getLectureInfo = createAsyncThunk<
  any,
  { accessToken: string; lectureId: number },
  { rejectValue: ErrorResponse }
>('dashboardLecture/getLectureById', async ({ accessToken, lectureId }, { rejectWithValue }) => {
  try {
    const response = await dashboardLectureServices.getLectureById(accessToken, lectureId);
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
      message: 'Fail to get lecture info! please try again!',
      statusCode: 500,
    });
  }
});

export const getReportData = createAsyncThunk<
  any,
  { accessToken: string; filterBy: string },
  { rejectValue: ErrorResponse }
>('dashboardLecture/getReportData', async ({ accessToken, filterBy }, { rejectWithValue }) => {
  try {
    const response = await dashboardLectureServices.getReportData(
      accessToken,
      filterBy.toLowerCase()
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
      message: 'Fail to get report Data! please try again!',
      statusCode: 500,
    });
  }
});

export const getTopRateCourses = createAsyncThunk<
  any,
  { accessToken: string; request: TopRatesCourseRequestModel },
  { rejectValue: ErrorResponse }
>('dashboardLecture/getTopRateCourses', async ({ accessToken, request }, { rejectWithValue }) => {
  try {
    const response = await dashboardLectureServices.getTopRatesCourse(accessToken, request);
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
      message: 'Fail to get top-rated courses! please try again!',
      statusCode: 500,
    });
  }
});

export const getLatestFeedbackLecturer = createAsyncThunk<
  any,
  { accessToken: string; request: LectureFeedbackCourseRequestModel },
  { rejectValue: ErrorResponse }
>(
  'dashboardLecture/getLatestFeedbackLecturer',
  async ({ accessToken, request }, { rejectWithValue }) => {
    try {
      const response = await dashboardLectureServices.getLatestFeedback(accessToken, request);
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
        message: 'Fail to get feedback Data! please try again!',
        statusCode: 500,
      });
    }
  }
);
