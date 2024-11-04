import { createAsyncThunk } from '@reduxjs/toolkit';
import listCourseLectureServices from '../../services';
import { SearchRequestModel } from '@app/stores/models';

export const getListCourseOfLecture = createAsyncThunk(
  'listCourseLecture/getListCourseOfLecture',
  async (
    { accessToken, lectureId, filter }: { accessToken: string, lectureId: number, filter: SearchRequestModel },
    { rejectWithValue }
  ) => {
    try {
      const response = await listCourseLectureServices.getListCourseOfLecture(accessToken, lectureId, filter);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Fail to get list course of lecture! please try again!',
      });
    }
  }
);
