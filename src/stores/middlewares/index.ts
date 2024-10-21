import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { showDialog } from '../slices/dialogSlice';
import { DialogType } from '../types/dialogSlice.type';

const apiMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage =
        (action.payload as { message?: string })?.message || 'Something went wrong';

      dispatch(
        showDialog({
          title: 'error',
          content: errorMessage,
          type: DialogType.ERROR,
        })
      );
    }
    return next(action);
  };

export default apiMiddleware;
