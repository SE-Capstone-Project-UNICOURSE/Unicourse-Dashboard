import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { PaginatedRequestParams } from '@app/stores/models';
import { showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import React, { useCallback, useEffect } from 'react';
import { setActiveStep, setOnlineActiveCoursePage, setSelectedCourseId } from '../slices';
import { getPublishCourses } from '../slices/actions';

const useListOnlineCourseLecturerViewModel = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { accessToken } = useGetAccessRefreshToken();
  const { pageSize, page } = useAppSelector(
    (state) => state.listCourseOfflineLecture.listPublishCourses
  );

  const { activeStep, selectedCourseId } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );

  useEffect(() => {
    if (accessToken) {
      const request: PaginatedRequestParams = {
        page,
        pageSize,
        where: {
          status: 'PUBLISHED',
        },
      };
      dispatch(getPublishCourses({ accessToken, request }));
    } else {
      router.push('/sign-in');
      localStorage.clear();
    }
  }, [page, pageSize, accessToken]);

  const handleNextStep = useCallback(() => {
    if (selectedCourseId === null) {
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Vui lòng chọn khóa học trước khi tiếp tục',
          type: DialogType.WARNING,
        })
      );
      return;
    }

    dispatch(setActiveStep(activeStep + 1));
  }, [dispatch, activeStep, selectedCourseId]);

  const handlePrevStep = useCallback(() => {
    if (activeStep > 1) {
      dispatch(setActiveStep(activeStep - 1));
    }
  }, [dispatch, activeStep]);

  const handleSelectCourse = (courseId: number) => {
    dispatch(setSelectedCourseId(courseId));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setOnlineActiveCoursePage(value));
  };

  return { handleNextStep, handlePrevStep, handleSelectCourse, handlePageChange };
};

export default useListOnlineCourseLecturerViewModel;
