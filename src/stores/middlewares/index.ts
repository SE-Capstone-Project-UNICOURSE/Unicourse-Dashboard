import ErrorResponse from '@app/common/models/ErrorResponse';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { hideDialog, showDialog } from '../slices/dialogSlice';
import { DialogType } from '../types/dialogSlice.type';

const history = createBrowserHistory();

const apiMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { statusCode, message } = action.payload as ErrorResponse;

      if (statusCode === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch(
          showDialog({
            title: 'Session Expired',
            content: 'Your session has expired. Please log in again.',
            type: DialogType.ERROR,
            onConfirm() {
              dispatch(hideDialog());
              history.push('/sign-in');
            },
            onCancel() {
              dispatch(hideDialog());
              history.push('/sign-in');
            },
          })
        );
      } else {
        const errorMessage = message || 'Something went wrong';
        dispatch(
          showDialog({
            title: 'Error',
            content: errorMessage,
            type: DialogType.ERROR,
          })
        );
      }
    }
    return next(action);
  };

export default apiMiddleware;
