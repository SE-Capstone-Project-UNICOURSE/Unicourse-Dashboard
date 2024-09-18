import { createAsyncThunk } from '@reduxjs/toolkit';
import appServices from '../services/app.services';

export const loginThunk = createAsyncThunk(
  'auth/googleLogin',
  async ({ idToken }: { idToken: string }, { rejectWithValue, signal }) => {
    try {
      const response = await appServices.loginApi(idToken, signal);
      if (response.data) {
        const accessToken = response.data.accessToken.split(' ')[1];
        const refreshToken = response.data.refreshToken.split(' ')[1];
      }
      return response.data;
    } catch {
      const errorMessage = 'Login Credientials Expired, Please Login Again';
      return rejectWithValue({ message: errorMessage });
    }
  }
);
