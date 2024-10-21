import type User from '../../models/User.model';

type AuthStateType = {
  auth: {
    accountType: 'google' | 'apple' | null; // Account types
    isLoading: boolean;
    userInfo: User | null;
    accessToken: string;
    refreshToken: string;
    error: string | null;
    isLoadingSignIn: boolean;
    isLoadingSignUp: boolean;
  };
};

const initialAuthState: AuthStateType = {
  auth: {
    accountType: null,
    isLoading: false,
    userInfo: null,
    accessToken: '',
    refreshToken: '',
    error: '',
    isLoadingSignIn: false,
    isLoadingSignUp: false,
  },
};

export { initialAuthState };
export type { AuthStateType };
