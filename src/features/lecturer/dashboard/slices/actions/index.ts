import { createAsyncThunk } from '@reduxjs/toolkit';
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
