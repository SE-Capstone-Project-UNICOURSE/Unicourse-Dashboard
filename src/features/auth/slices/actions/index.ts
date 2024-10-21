import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../../services';

export const loginIdToken = createAsyncThunk(
  'auth/googleLogin',
  async ({ idToken }: { idToken: string }, { rejectWithValue }) => {
    try {
      const response = await AuthServices.loginToken(idToken);
      if (response.data) {
        const accessToken = response.data.accessToken.split(' ')[1];
        const refreshToken = response.data.refreshToken.split(' ')[1];

        // WARNING
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      return response;
    } catch {
      const errorMessage = 'Login Error, Please Try Again!';
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Async thunk for fetching courses by category with pagination
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AuthServices.signIn(email, password);
      if (response.data) {
        const accessToken = response.data.accessToken.split(' ')[1];
        const refreshToken = response.data.refreshToken.split(' ')[1];

        // WARNING
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      return response.data;
    } catch {
      return rejectWithValue({ message: 'Sign In With Email Error!' });
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (
    { accessToken, refreshToken }: { accessToken: string; refreshToken: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthServices.logout(accessToken, refreshToken);
      return response.data;
    } catch {
      const errorMessage = 'Logout Failed !';
      return rejectWithValue({ message: errorMessage });
    }
  }
);
