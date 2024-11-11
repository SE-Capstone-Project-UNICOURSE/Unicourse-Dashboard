// CreateCourseOfflineForm.tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@app/stores';

import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { formFields } from '../../configs/formFieldCourseOffline.config';
import { courseMentorCreation } from '../../schema/courseMentorCreation.schema';
import {
  courseMentorCreationDefaultFormValues,
  courseMentorCreationFormValues,
} from '../../types/courseMentorCreationFormValues';
import { setActiveStep } from '../../slices';

const CreateCourseOfflineForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<courseMentorCreationFormValues>({
    resolver: yupResolver(courseMentorCreation),
    defaultValues: courseMentorCreationDefaultFormValues,
  });

  const { activeStep } = useAppSelector((state) => state.listCourseOfflineLecture);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<courseMentorCreationFormValues> = (data) => {
    console.log(data);
    handleNext();
  };

  // Handle step navigation
  const handleNext = useCallback(() => {
    dispatch(setActiveStep(activeStep + 1));
  }, [activeStep, dispatch]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        {/* Uncomment this if you need a "Back" button */}
        {/* <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
          Quay lại
        </Button> */}
        <Button
          type="submit" // Make this a submit button to trigger validation
          variant="contained"
          color="primary"
        >
          Tiếp tục
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCourseOfflineForm;
