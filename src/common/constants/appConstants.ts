export const TIMEOUT = 10000;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const VIMEOKEY = import.meta.env.VITE_VIMEOKEY;

export const APP_COMMON_API_PATH = {
  LOGIN: '/api/auth/token-signin',
};

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const COMMON_CONSTANTS = {
  COURSE: 'course',
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CLOSED: 'CLOSED',
};

export const APP_COLOR = {
  border: '#ccc', // Default border color
  highlight: '#3f51b5', // Highlight color for selected items
  shadow: 'rgba(63, 81, 181, 0.5)', // Shadow color for selected cards
  error: '#d32f2f', // Error color for warnings or errors
  success: '#388e3c', // Success color for success messages
  info: '#1976d2', // Info color for informational messages/icons
};
