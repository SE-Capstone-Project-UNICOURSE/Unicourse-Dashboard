import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { PaginatedRequestParams } from '@app/stores/models';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { useEffect } from 'react';
import { resetCourseOfflineLectureState, setPageOfflineCourse, setScreenState } from '../slices';
import { getCourseOfflineDetail, getOfflineCourseMentor } from '../slices/actions';
import { useParams } from 'react-router-dom';

const useOfflineCourseLectureViewModel = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useGetAccessRefreshToken();
  const {
    listOfflineCourse: { page, pageSize, statusCourse, sortByCreatedDate },
    screenState,
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const router = useRouter();
  const { courseId } = useParams();

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
    const handleInitCourseOfflineLecturer = () => {
      if (!accessToken) {
        router.push('/sign-in');
        return;
      }

      if (!courseId) {
        dispatch(setScreenState('list'));
        handleGetListOfflineCourseByLecture(page);
        return;
      }

      switch (screenState) {
        case 'list':
          dispatch(setScreenState('detail'));
          handleGetListOfflineCourseByLecture(page);
          break;
        case 'detail':
          dispatch(setScreenState('detail'));
          dispatch(getCourseOfflineDetail({ accessToken, courseMentorId: Number(courseId) }));
          break;
        default:
          break;
      }
    };
    handleInitCourseOfflineLecturer();
    return () => {
      dispatch(resetCourseOfflineLectureState());
    };
  }, [accessToken, courseId, router, screenState]);

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
