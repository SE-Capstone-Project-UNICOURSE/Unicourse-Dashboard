import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { useAppDispatch } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCourseCalendarFormFields } from '../../configs/useCourseCalendarFormFields';
import { courseMentorSessionSchema } from '../../schema/courseMentorSession.schema';
import {
  CourseMentorSessionFormValues,
  courseMentorSessionFormValues,
} from '../../types/courseMentorSessionFormValues';
import { GridDeleteIcon } from '@mui/x-data-grid';

type CreateCourseCalendarFormProps = {
  indexItem: number;
  onDelete: (formId: number) => void;
};

const CreateCourseCalendarForm = ({ indexItem, onDelete }: CreateCourseCalendarFormProps) => {
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} position="relative">
      {/* Delete Button */}
      <IconButton
        onClick={() => onDelete(indexItem)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          marginBottom: 30,
        }}
        aria-label="delete"
      >
        <GridDeleteIcon />
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Tạo Mô Tả Buổi {indexItem + 1}
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
