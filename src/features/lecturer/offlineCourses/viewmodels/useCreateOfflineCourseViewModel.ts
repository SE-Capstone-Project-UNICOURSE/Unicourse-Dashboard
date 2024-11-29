import { useAppDispatch } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { courseMentorCreation } from '../schema/courseMentorCreation.schema';
import { setCreateCourseInstruction } from '../slices';
import {
  courseMentorCreationDefaultFormValues,
  courseMentorCreationFormValues,
} from '../types/courseMentorCreationFormValues';

const useCreateEditOfflineCourseViewModel = () => {
  const methods = useForm<courseMentorCreationFormValues>({
    resolver: yupResolver(courseMentorCreation),
    defaultValues: courseMentorCreationDefaultFormValues,
  });

  const dispatch = useAppDispatch();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(setCreateCourseInstruction(open));
  };

  return { methods, toggleDrawer };
};

export default useCreateEditOfflineCourseViewModel;
