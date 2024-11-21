import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { useEffect, useState } from 'react';
import { getCategories, getCourseDetailById } from '../slices/actions';

const useCourseDetailViewModel = ({ courseId }: { courseId: number }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessToken = localStorage.getItem('accessToken');
  const [editMode, setEditMode] = useState(false);
  const { isFirstLoadCategory } = useAppSelector((state) => state.courseDetailLecture);

  // Fetch list course of lecture
  useEffect(() => {
    if (!accessToken) {
      router.push('/sign-in');
    } else if (courseId) {
      dispatch(
        getCourseDetailById({
          accessToken: accessToken || '',
          courseId,
        })
      );
    }
  }, [accessToken, courseId]);

  // Fetch categories and call if not already fetched
  useEffect(() => {
    console.log('First load category:', isFirstLoadCategory);
    if (isFirstLoadCategory) {
      dispatch(getCategories());
    }
  }, [isFirstLoadCategory]);

  return {
    editMode,
    setEditMode
  };
};

export default useCourseDetailViewModel;
