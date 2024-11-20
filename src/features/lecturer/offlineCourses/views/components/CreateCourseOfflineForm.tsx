import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box, Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import GradientButton from '@app/common/components/atoms/GradientButton';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useCourseMentorFormFields from '../../configs/useCourseMentorFormFields';
import { setActiveStep, setOfflineCourseRequest } from '../../slices';
import { getCenters, getCourseDetail } from '../../slices/actions';
import { courseMentorCreationFormValues } from '../../types/courseMentorCreationFormValues';
import CourseDetailInfoCreate from './CourseDetailInfoCreate';

type CreateCourseOfflineFormProps = {
  methods: UseFormReturn<courseMentorCreationFormValues, any, undefined>;
};

const CreateCourseOfflineForm = ({ methods }: CreateCourseOfflineFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { activeStep, selectedCourseId } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const dispatch = useAppDispatch();
  const formFields = useCourseMentorFormFields();
  const { accessToken } = useGetAccessRefreshToken();

  const onSubmit: SubmitHandler<courseMentorCreationFormValues> = (data) => {
    console.log(data);
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
        mentor_sessions: [],
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

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={8} md={9}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} {...methods}>
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
          </form>
        </FormProvider>
      </Grid>

      <Grid item xs={12} lg={4} md={3}>
        <CourseDetailInfoCreate />
      </Grid>
    </Grid>
  );
};

export default CreateCourseOfflineForm;
