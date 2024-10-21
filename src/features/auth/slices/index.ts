import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import type User from '../models/User.model';
import { loginIdToken, logoutThunk, signInWithEmail } from './actions';
import { initialAuthState } from './types';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setIsAuthLoading(state, action: PayloadAction<boolean>) {
      state.auth.isLoading = action.payload;
    },
    setUserInfo(state, action: PayloadAction<User>) {
      state.auth.userInfo = action.payload;
    },

    setAccountType(state, action: PayloadAction<'google' | 'apple' | null>) {
      state.auth.accountType = action.payload;
    },
    setToken(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.auth.accessToken = action.payload.accessToken;
      state.auth.refreshToken = action.payload.refreshToken;
    },
    resetAuthState() {
      return initialAuthState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginIdToken.pending, (state) => {
        state.auth.isLoading = true;
        state.auth.error = null;
      })
      .addCase(loginIdToken.fulfilled, (state, action) => {
        const accessToken = action.payload?.data?.accessToken;
        const refreshToken = action.payload?.data?.refreshToken;

        if (accessToken && refreshToken) {
          const cleanedAccessToken = accessToken.split(' ')[1];
          const cleanedRefreshToken = refreshToken.split(' ')[1];
          state.auth.userInfo = jwtDecode<User>(cleanedAccessToken);
          state.auth.accessToken = cleanedAccessToken;
          state.auth.refreshToken = cleanedRefreshToken;
          state.auth.error = '';
        }
        state.auth.isLoading = false;
      })
      .addCase(loginIdToken.rejected, (state, action) => {
        state.auth.isLoading = false;
        state.auth.error = action.error?.message || 'An error occurred';
      });
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.auth.isLoadingSignIn = true;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.auth.isLoadingSignIn = false;
        const accessToken = action.payload?.accessToken;
        const refreshToken = action.payload?.refreshToken;

        if (accessToken && refreshToken) {
          const cleanedAccessToken = accessToken.split(' ')[1];
          const cleanedRefreshToken = refreshToken.split(' ')[1];
          state.auth.userInfo = jwtDecode<User>(cleanedAccessToken);
          state.auth.accessToken = cleanedAccessToken;
          state.auth.refreshToken = cleanedRefreshToken;
          state.auth.error = '';
        }
      })
      .addCase(signInWithEmail.rejected, (state) => {
        state.auth.isLoadingSignIn = false;
      });

    builder.addCase(logoutThunk.pending, (state) => {
      state.auth.isLoading = true;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.auth.isLoading = false;
    });
    builder.addCase(logoutThunk.rejected, (state) => {
      state.auth.isLoading = true;
    });
  },
});

export const { setToken, setIsAuthLoading, setUserInfo, setAccountType, resetAuthState } =
  authSlice.actions;
export default authSlice.reducer;
