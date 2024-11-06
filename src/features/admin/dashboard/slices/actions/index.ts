import { createAsyncThunk } from '@reduxjs/toolkit';
import AdminDashboardService from '../../services';

// Action để lấy dữ liệu thống kê tổng quát
export const getStatistics = createAsyncThunk(
  'adminDashboard/getStatistics',
  async ({ accessToken }: { accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await AdminDashboardService.getStatistics(accessToken);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Failed to get statistics! Please try again!',
      });
    }
  }
);

// Action để lấy danh sách top 10 khóa học theo doanh thu
export const getTopCoursesIncome = createAsyncThunk(
  'adminDashboard/getTopCoursesIncome',
  async ({ accessToken }: { accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await AdminDashboardService.getTopCourses(accessToken);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Failed to get top courses income! Please try again!',
      });
    }
  }
);

// Action để lấy danh sách người dùng trả phí
export const getPaidUsersStatistics = createAsyncThunk(
  'adminDashboard/getPaidUsersStatistics',
  async ({ accessToken }: { accessToken: string }, { rejectWithValue }) => {
    try {
      const response = await AdminDashboardService.getWillingUsers(accessToken);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ message: error.response.data.message });
      }
      return rejectWithValue({
        message: 'Failed to get paid users statistics! Please try again!',
      });
    }
  }
);
