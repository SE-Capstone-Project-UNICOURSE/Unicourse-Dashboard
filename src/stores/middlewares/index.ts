import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

const apiMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage =
        (action.payload as { message?: string })?.message || 'Something went wrong';
    }
    return next(action);
  };

export default apiMiddleware;
