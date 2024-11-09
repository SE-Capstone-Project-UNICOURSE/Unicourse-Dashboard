import { createAsyncThunk } from '@reduxjs/toolkit';
import courseDetailLectureServices from '../../services';

export const getCourseDetailById = createAsyncThunk(
  'courseDetailLecture/getCourseDetailOfLecture',
  async (
    { accessToken, courseId }: { accessToken: string; courseId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await courseDetailLectureServices.getCourseDetailById(accessToken, courseId);
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

export const getCategories = createAsyncThunk(
  'courseDetailLecture/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseDetailLectureServices.getCategories();
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

export const getVideoVimeoWithAccessToken = createAsyncThunk(
  'courseDetailLecture/getVideoVimeoWithAccessToken',
  async (
    {
      accessToken,
      videoUrl,
      width,
      height,
    }: {
      accessToken: string;
      videoUrl: string;
      width: number;
      height: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await courseDetailLectureServices.getVimeoVideoWithAccessToken(
        accessToken,
        videoUrl,
        width,
        height
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Fail to get video vimeo! please try again!',
      });
    }
  }
);
