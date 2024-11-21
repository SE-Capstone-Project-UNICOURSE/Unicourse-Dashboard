import { Box, Grid } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import GradientButton from '@app/common/components/atoms/GradientButton';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { useAppDispatch, useAppSelector } from '@app/stores';
import useCourseMentorFormFields from '../../configs/useCourseMentorFormFields';
import { setActiveStep } from '../../slices';
import { courseMentorCreationFormValues } from '../../types/courseMentorCreationFormValues';
import useCreateCourseOfflineFormViewModel from '../../viewmodels/useCreateCourseOfflineFormViewModel';
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

  const { activeStep } = useAppSelector((state) => state.listCourseOfflineLecture);

  const { onSubmit } = useCreateCourseOfflineFormViewModel();
  const formFields = useCourseMentorFormFields();
  const dispatch = useAppDispatch();

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
