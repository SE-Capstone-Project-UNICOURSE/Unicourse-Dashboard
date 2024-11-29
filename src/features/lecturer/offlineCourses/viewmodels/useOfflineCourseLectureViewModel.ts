import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { PaginatedRequestParams } from '@app/stores/models';
import { showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resetCourseOfflineLectureState, setPageOfflineCourse, setScreenState } from '../slices';
import {
  getCenters,
  getCourseDetail,
  getCourseOfflineDetail,
  getOfflineCourseMentor,
} from '../slices/actions';

const useOfflineCourseLectureViewModel = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useGetAccessRefreshToken();
  const {
    listOfflineCourse: { page, pageSize, statusCourse, sortByCreatedDate },
    courseOfflineDetail: { data: courseOfflineDetail },
    selectedCourseEditId,
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
  }, [courseId]);

  useEffect(() => {
    const handleInitFetchingDataEditCourse = async () => {
      if (!accessToken) {
        dispatch(
          showDialog({
            title: 'Lỗi',
            content: 'Phiên đăng nhập không tìm thấy, vui lòng đăng nhập lại !',
            type: DialogType.ERROR,
          })
        );
        router.push('/sign-in');
        return;
      }
      if (!selectedCourseEditId) {
        return;
      }
      dispatch(getCenters({ accessToken }));

      dispatch(getCourseOfflineDetail({ accessToken, courseMentorId: selectedCourseEditId }));
      console.log('data');
    };

    handleInitFetchingDataEditCourse();
  }, [selectedCourseEditId]);

  useEffect(() => {
    if (courseOfflineDetail?.course_id) {
      console.log(courseOfflineDetail);

      dispatch(getCourseDetail({ courseId: courseOfflineDetail.course_id }));
    }
  }, [courseOfflineDetail]);

  const handleCreateNewCourse = useCallback(() => {
    dispatch(setScreenState('add'));
  }, []);

  return { handleCreateNewCourse, handleChangePage };
};

export default useOfflineCourseLectureViewModel;
