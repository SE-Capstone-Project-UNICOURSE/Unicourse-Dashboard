import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { useAppDispatch } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCourseCalendarFormFields } from '../../configs/useCourseCalendarFormFields';
import { courseMentorSessionSchema } from '../../schema/courseMentorSession.schema';
import {
  CourseMentorSessionFormValues,
  courseMentorSessionFormValues,
} from '../../types/courseMentorSessionFormValues';

const CreateCourseCalendarForm = () => {
  const dispatch = useAppDispatch();
  const formFields = useCourseCalendarFormFields();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseMentorSessionFormValues>({
    resolver: yupResolver(courseMentorSessionSchema),
    defaultValues: courseMentorSessionFormValues,
  });

  const onSubmit: SubmitHandler<CourseMentorSessionFormValues> = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Tạo Mô Tả Buổi
      </Typography>

      <Grid container spacing={2} mb={2}>
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
    </Box>
  );
};

export default CreateCourseCalendarForm;
