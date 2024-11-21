import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { setActiveStep, setOfflineCourseRequest } from '../slices';
import { getCenters, getCourseDetail } from '../slices/actions';
import { courseMentorCreationFormValues } from '../types/courseMentorCreationFormValues';

const useCreateCourseOfflineFormViewModel = () => {
  const { activeStep, selectedCourseId, offlineCourseRequest } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const dispatch = useAppDispatch();
  const { accessToken } = useGetAccessRefreshToken();

  const onSubmit: SubmitHandler<courseMentorCreationFormValues> = (data) => {
    if (!selectedCourseId) {
      return;
    }
    dispatch(
      setOfflineCourseRequest({
        course_id: selectedCourseId,
        amount: data.amount,
        center_id: data.center_id,
        description: data.description,
        discount: data.discount,
        image: data.image,
        mentor_sessions: [...(offlineCourseRequest?.mentor_sessions || [])],
        title: data.title,
        start_date: data.date_range.start_date,
        end_date: data.date_range.end_date,
      })
    );
    handleNext();
  };

  useEffect(() => {
    if (selectedCourseId) {
      dispatch(getCourseDetail({ courseId: selectedCourseId }));
    }
    if (accessToken) {
      dispatch(getCenters({ accessToken }));
    }
  }, []);

  const handleNext = useCallback(() => {
    dispatch(setActiveStep(activeStep + 1));
  }, [activeStep]);
  return {
    onSubmit,
  };
};

export default useCreateCourseOfflineFormViewModel;
