import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useUploadFileToFirebase from '@app/hooks/useUploadFileToFirebase';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { PaginatedRequestParams } from '@app/stores/models';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { useState } from 'react';
import CourseOfflineService from '../services';
import { setScreenState } from '../slices';
import { getOfflineCourseMentor } from '../slices/actions';

const useConfirmCreateCourseOfflineViewModel = () => {
  const dispatch = useAppDispatch();
  const { offlineCourseRequest } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { accessToken } = useGetAccessRefreshToken();
  const router = useRouter();
  const [isLoadingCreateCourseOffline, setIsLoadingCreateCourseOffline] = useState(false);
  const { uploadFileToFirebase } = useUploadFileToFirebase();

  const handleCreateCourseOffline = async () => {
    if (!accessToken) {
      // Show error dialog if the user is not logged in
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Không tìm thấy người dùng vui lòng đăng nhập lại',
          onConfirm() {
            dispatch(hideDialog());
            router.push('/sign-in');
            localStorage.clear();
          },
          onCancel() {
            dispatch(hideDialog());
            router.push('/sign-in');
            localStorage.clear();
          },
          type: DialogType.ERROR,
        })
      );
      return;
    }

    if (!offlineCourseRequest) {
      // Guard clause for null `offlineCourseRequest`
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Không tìm thấy thông tin khóa học, vui lòng kiểm tra lại',
          type: DialogType.WARNING,
        })
      );
      return;
    }

    if (!offlineCourseRequest.image || typeof offlineCourseRequest.image === 'string') {
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Không tìm thấy hình ảnh, vui lòng cập nhật lại hình ảnh khóa học',
          type: DialogType.WARNING,
        })
      );
      return;
    }
    try {
      setIsLoadingCreateCourseOffline(true);
      // Upload file to Firebase and get the URL
      const imageUrl = await uploadFileToFirebase(offlineCourseRequest.image, 'Course/Offline');
      const response = await CourseOfflineService.createOfflineCourses(accessToken, {
        ...offlineCourseRequest,
        image: imageUrl,
      });

      if (response.data?.created_status) {
        const request: PaginatedRequestParams = {
          page: 1,
          pageSize: 10,
          where: {
            status: {
              equals: 'DRAFT',
            },
            is_mentor: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        };

        dispatch(
          showDialog({
            title: 'Thành công',
            content: 'Khóa học đã được tạo thành công!',
            type: DialogType.SUCCESS,
            onConfirm() {
              dispatch(setScreenState('list'));
              dispatch(getOfflineCourseMentor({ accessToken, request }));
              dispatch(hideDialog());
            },
            onCancel() {
              dispatch(setScreenState('list'));
              dispatch(getOfflineCourseMentor({ accessToken, request }));
              dispatch(hideDialog());
            },
          })
        );
      } else {
        throw new Error(response.message || 'Unknown error');
      }
    } catch (error) {
      console.error(error);
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Đã xảy ra lỗi khi tạo khóa học, vui lòng thử lại.',
          type: DialogType.ERROR,
        })
      );
    } finally {
      setIsLoadingCreateCourseOffline(false);
    }
  };

  const handleConfirmationCreateCourseOffline = () => {
    dispatch(
      showDialog({
        title: 'Xác nhận',
        content: 'Đã xác nhận toàn bộ thông tin là chính xác',
        type: DialogType.ALERT,
        onConfirm() {
          dispatch(hideDialog());
          handleCreateCourseOffline();
        },
        confirmButtonText: 'Tạo ngay',
      })
    );
  };
  return { handleConfirmationCreateCourseOffline, isLoadingCreateCourseOffline };
};

export default useConfirmCreateCourseOfflineViewModel;
