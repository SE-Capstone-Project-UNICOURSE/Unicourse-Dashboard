import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { PaginatedRequestParams } from '@app/stores/models';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { useEffect } from 'react';
import { resetCourseOfflineLectureState, setPageOfflineCourse, setScreenState } from '../slices';
import { getOfflineCourseMentor } from '../slices/actions';

const useOfflineCourseLectureViewModel = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useGetAccessRefreshToken();
  const { page, pageSize, statusCourse, sortByCreatedDate } = useAppSelector(
    (state) => state.listCourseOfflineLecture.listOfflineCourse
  );
  const router = useRouter();

  const handleGetListOfflineCourseByLecture = async (pageCourse: number) => {
    if (!accessToken) {
      router.push('/sign-in');
      return;
    }
    const request: PaginatedRequestParams = {
      page: pageCourse,
      pageSize,
      where: {
        status: {
          equals: statusCourse,
        },
        is_mentor: true,
      },
      orderBy: {
        created_at: sortByCreatedDate,
      },
    };
    dispatch(getOfflineCourseMentor({ accessToken, request }));
  };

  const handleChangePage = (pageNumber: number) => {
    dispatch(setPageOfflineCourse(pageNumber));
    handleGetListOfflineCourseByLecture(pageNumber);
  };

  useEffect(() => {
    handleGetListOfflineCourseByLecture(page);
    return () => {
      dispatch(resetCourseOfflineLectureState());
    };
  }, []);
  const handleCreateNewCourse = () => {
    dispatch(
      showDialog({
        title: 'Xác nhận',
        content: 'Bạn có chắc rằng là muốn tạo khoá học trực tiếp mới chứ ?',
        type: DialogType.ALERT,
        onCancel() {
          dispatch(hideDialog());
        },
        onConfirm() {
          dispatch(setScreenState('add'));
          dispatch(hideDialog());
        },
      })
    );
  };
  return { handleCreateNewCourse, handleChangePage };
};

export default useOfflineCourseLectureViewModel;
