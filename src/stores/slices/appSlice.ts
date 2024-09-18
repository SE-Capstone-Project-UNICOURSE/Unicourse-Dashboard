import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { loginThunk } from '../actions/appThunk';
import type { User } from '../types/appSlice.type';
import { initialAppState } from '../types/appSlice.type';

const appSlice = createSlice({
  name: 'auth',
  initialState: initialAppState,
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
    resetAuthState(state) {
      return initialAppState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.auth.isLoading = true;
        state.auth.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
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
        state.auth.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.auth.isLoading = false;
        state.auth.error = action.error?.message || 'An error occurred';
      });
  },
});

export const { setToken, setIsAuthLoading, setUserInfo, setAccountType, resetAuthState } =
  appSlice.actions;
export default appSlice.reducer;
