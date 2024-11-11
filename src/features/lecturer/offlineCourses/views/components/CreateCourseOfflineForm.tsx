import { useAppDispatch, useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import GradientButton from '@app/common/components/atoms/GradientButton';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { useCourseMentorFormFields } from '../../configs/useCourseMentorFormFields';
import { courseMentorCreation } from '../../schema/courseMentorCreation.schema';
import { setActiveStep } from '../../slices';
import { getCenters, getCourseDetail } from '../../slices/actions';
import {
  courseMentorCreationDefaultFormValues,
  courseMentorCreationFormValues,
} from '../../types/courseMentorCreationFormValues';
import CourseDetailInfoCreate from './CourseDetailInfoCreate';

const CreateCourseOfflineForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<courseMentorCreationFormValues>({
    resolver: yupResolver(courseMentorCreation),
    defaultValues: courseMentorCreationDefaultFormValues,
  });

  const { activeStep, selectedCourseId } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const dispatch = useAppDispatch();
  const formFields = useCourseMentorFormFields();

  const accessToken = localStorage.getItem('accessToken');

  const onSubmit: SubmitHandler<courseMentorCreationFormValues> = (data) => {
    console.log(data);
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

  return (
    <Box display="flex" gap={4}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate width="65%">
        <Grid container spacing={2}>
          {formFields.map((fieldConfig) => (
            <Grid
              item
              xs={fieldConfig.grid?.xs}
              sm={fieldConfig.grid?.sm}
              md={fieldConfig.grid?.md}
              key={fieldConfig.name}
            >
              <FormInputRender
                fieldConfig={fieldConfig}
                control={control}
                error={!!errors[fieldConfig.name]}
                helperText={errors[fieldConfig.name]?.message as string}
              />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <GradientButton
            variant="outlined"
            onClick={() => {
              dispatch(setActiveStep(activeStep - 1));
            }}
          >
            Quay lại
          </GradientButton>

          <GradientButton type="submit">Tiếp tục</GradientButton>
        </Box>
      </Box>

      <Box width="35%">
        <CourseDetailInfoCreate />
      </Box>
    </Box>
  );
};

export default CreateCourseOfflineForm;
