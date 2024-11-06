// src/features/adminDashboard/adminDashboardSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import {
  getStatistics,
  getTopCoursesIncome,
  getPaidUsersStatistics,
} from './actions';
import { initialAdminDashboardState } from './types';

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: initialAdminDashboardState,
  reducers: {
    resetAdminDashboard: () => initialAdminDashboardState,
  },
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái cho getStatistics
      .addCase(getStatistics.pending, (state) => {
        state.statistics.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.statistics.isLoading = false;
        state.statistics.data = action.payload;
      })
      .addCase(getStatistics.rejected, (state) => {
        state.statistics.isLoading = false;
      });

    // Xử lý trạng thái cho getTopCoursesIncome
    builder
      .addCase(getTopCoursesIncome.pending, (state) => {
        state.topCoursesIncome.isLoading = true;
      })
      .addCase(getTopCoursesIncome.fulfilled, (state, action) => {
        state.topCoursesIncome.isLoading = false;
        state.topCoursesIncome.data = action.payload;
      })
      .addCase(getTopCoursesIncome.rejected, (state) => {
        state.topCoursesIncome.isLoading = false;
      });

    // Xử lý trạng thái cho getPaidUsersStatistics
    builder
      .addCase(getPaidUsersStatistics.pending, (state) => {
        state.paidUsersStatistics.isLoading = true;
      })
      .addCase(getPaidUsersStatistics.fulfilled, (state, action) => {
        state.paidUsersStatistics.isLoading = false;
        state.paidUsersStatistics.data = action.payload;
      })
      .addCase(getPaidUsersStatistics.rejected, (state) => {
        state.paidUsersStatistics.isLoading = false;
      });
  },
});

export const { resetAdminDashboard } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
