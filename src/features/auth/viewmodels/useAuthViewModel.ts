import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch } from '@app/stores';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { auth, googleProvider } from '@app/utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode';
import type User from '../models/User.model';
import { loginIdToken } from '../slices/actions';

const useAuthViewModel = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleConfirm = () => {
    dispatch(hideDialog());
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      await dispatch(loginIdToken({ idToken }))
        .unwrap()
        .then((data) => {
          const cleanedAccessToken = data.data?.accessToken.split(' ')[1];
          const user = jwtDecode<User>(cleanedAccessToken || '');

          // Kiểm tra role của user
          if (user.role === 'LECTURER' || user.role === 'ADMIN') {
            router.push(`/${user.role.toLowerCase()}`);
          } else {
            // Hiển thị thông báo lỗi cho các role khác
            dispatch(
              showDialog({
                title: 'Access Denied',
                content: 'Only lecturers and admins are allowed to access this resource.',
                type: DialogType.ERROR,
              })
            );
          }
        });
    } catch (error) {
      let errorMessage = '';

      // Log only specific Firebase Auth errors
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please try again.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Please check your connection';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please provide a valid email';
      } else {
        return; // Do not log any other cases
      }

      // Dispatch the dialog with the specific error message
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: `Error signing in with Google: ${errorMessage}`,
          type: DialogType.ERROR,
        })
      );
    }
  };

  const handlePressShowDialog = () => {
    dispatch(
      showDialog({
        title: 'Error',
        content: 'Erorr',
        type: DialogType.SUCCESS,
        onConfirm: handleConfirm,
      })
    );
  };

  return { signInWithGoogle, handlePressShowDialog };
};

export default useAuthViewModel;
