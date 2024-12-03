import { useAppDispatch, useAppSelector } from '@app/stores';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { setActiveEditStep } from '../slices';
import { courseMentorEditFormValuesTypes } from '../types/courseMentorEditFormValues';

type UseEditCourseOfflineFormViewModelProps = {
  methods: UseFormReturn<courseMentorEditFormValuesTypes, any, undefined>;
};

const useEditCourseOfflineFormViewModel = ({ methods }: UseEditCourseOfflineFormViewModelProps) => {
  const {
    activeEditStep,
    courseOfflineDetail: { data: courseOfflineDetail },
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<courseMentorEditFormValuesTypes> = (data) => {
    console.log(data);
  };

  const { reset } = methods;

  useEffect(() => {
    if (courseOfflineDetail) {
      reset({
        title: courseOfflineDetail.title,
        amount: courseOfflineDetail.amount,
        center_id: courseOfflineDetail.center.id,
        date_range: {
          start_date: courseOfflineDetail.start_date,
          end_date: courseOfflineDetail.end_date,
        },
        description: courseOfflineDetail.description,
        discount: courseOfflineDetail.discount,
        image: courseOfflineDetail.image,
      });
    }
  }, [courseOfflineDetail]);

  const handleNext = useCallback(() => {
    dispatch(setActiveEditStep(activeEditStep + 1));
  }, [activeEditStep]);

  return { onSubmit, handleNext };
};

export default useEditCourseOfflineFormViewModel;
