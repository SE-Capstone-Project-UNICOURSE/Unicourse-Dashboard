import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { useEffect, useState } from 'react';
import { getCategories, getCourseDetailById } from '../slices/actions';
import { Course } from '../models';

const useCourseDetailViewModel = ({ courseId }: { courseId: number }) => {
  const [originalCourse, setOriginalCourse] = useState<Course | undefined>(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessToken = localStorage.getItem('accessToken');
  const { isFirstLoadCategory } = useAppSelector((state) => state.courseDetailLecture);

  // Fetch course details for the given courseId if token exists
  useEffect(() => {
    // If no access token, redirect to sign-in
    if (!accessToken) {
      router.push('/sign-in');
    } else if (courseId) {
      // Dispatch action to get course details by id
      dispatch(getCourseDetailById({
        accessToken: accessToken || '',
        courseId,
      }));
    }
  }, [accessToken, courseId, dispatch, router]);  // Add `dispatch` and `router` as dependencies

  // Fetch categories only if it's the first time loading
  useEffect(() => {
    if (isFirstLoadCategory) {
      dispatch(getCategories());
    }
  }, [isFirstLoadCategory, dispatch]); // Ensure dispatch is included as a dependency

  return {
    originalCourse,
    setOriginalCourse,
  };
};

export default useCourseDetailViewModel;