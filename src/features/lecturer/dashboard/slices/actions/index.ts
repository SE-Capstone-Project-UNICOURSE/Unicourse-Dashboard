import { createAsyncThunk } from '@reduxjs/toolkit';
import { LectureFeedbackCourseRequestModel } from '../../models/LectureFeedbackCourseModel';
import { TopRatesCourseRequestModel } from '../../models/TopRatesCourseModel';
import dashboardLectureServices from '../../services';

export const getLectureInfo = createAsyncThunk(
  'dashboardLecture/getLectureById',
  async (
    { accessToken, lectureId }: { accessToken: string; lectureId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await dashboardLectureServices.getLectureById(accessToken, lectureId);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Fail to get lecture info! please try again!',
      });
    }
  }
);

export const getReportData = createAsyncThunk(
  'dashboardLecture/getReportData',
  async (
    { accessToken, filterBy }: { accessToken: string; filterBy: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await dashboardLectureServices.getReportData(
        accessToken,
        filterBy.toLowerCase()
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Fail to get report Data! please try again!',
      });
    }
  }
);

export const getTopRateCourses = createAsyncThunk(
  'dashboardLecture/getTopRateCourses',
  async (
    { accessToken, request }: { accessToken: string; request: TopRatesCourseRequestModel },
    { rejectWithValue }
  ) => {
    try {
      const response = await dashboardLectureServices.getTopRatesCourse(accessToken, request);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Fail to get report Data! please try again!',
      });
    }
  }
);

export const getLatestFeedbackLecturer = createAsyncThunk(
  'dashboardLecture/getLatestFeedbackLecturer',
  async (
    { accessToken, request }: { accessToken: string; request: LectureFeedbackCourseRequestModel },
    { rejectWithValue }
  ) => {
    try {
      const response = await dashboardLectureServices.getLatestFeedback(accessToken, request);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Fail to get feedback Data! please try again!',
      });
    }
  }
);
