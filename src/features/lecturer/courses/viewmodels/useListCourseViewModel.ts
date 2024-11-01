import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { ChangeEvent, useEffect, useState } from 'react';
import { getListCourseOfLecture } from '../slices/actions';
import SearchRequest from '@app/common/models/SearchRequest';

const useListCourseViewModel = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { listCourse } = useAppSelector((state) => state.listCourseLecture);
  const [pageOption, setPageOption] = useState<SearchRequest>({limit: 10, page: 1});
  const accessToken = localStorage.getItem('accessToken');

  // Fetch list course of lecture
  useEffect(() => {
    if (!accessToken) {
      router.push('/sign-in');
    } else {
      dispatch(
        getListCourseOfLecture({
          accessToken: accessToken || '',
          filter: {
            page: pageOption.page,
            limit: pageOption.limit,
          },
          lectureId: 1,
        })
      );
    }
  }, [accessToken, pageOption]);

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    if (listCourse.isLoadingGetListCourse) return;
    
    setPageOption({
      ...pageOption,
      page,
    });
  };

  return {
    pageOption,
    handleChange
  };
};

export default useListCourseViewModel;
