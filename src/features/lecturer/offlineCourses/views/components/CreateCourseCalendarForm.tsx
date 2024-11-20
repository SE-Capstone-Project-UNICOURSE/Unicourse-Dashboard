import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCourseCalendarFormFields } from '../../configs/useCourseCalendarFormFields';
import { courseMentorSessionSchema } from '../../schema/courseMentorSession.schema';
import {
  CourseMentorSessionFormValues,
  courseMentorSessionFormValues,
} from '../../types/courseMentorSessionFormValues';

type CreateCourseCalendarFormProps = {
  indexItem: number;
  onDelete: (formId: number) => void;
  formRef?: (ref: any) => void;
};

const CreateCourseCalendarForm = ({
  indexItem,
  onDelete,
  formRef,
}: CreateCourseCalendarFormProps) => {
  const formFields = useCourseCalendarFormFields();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger, // Thêm trigger để validate
  } = useForm<CourseMentorSessionFormValues>({
    resolver: yupResolver(courseMentorSessionSchema),
    defaultValues: courseMentorSessionFormValues,
  });

  // Gửi ref ra ngoài để cha quản lý
  if (formRef) {
    formRef({ trigger, handleSubmit });
  }

  const onSubmit: SubmitHandler<CourseMentorSessionFormValues> = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} position="relative">
      <IconButton
        onClick={() => onDelete(indexItem)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          marginBottom: 30,
          color: 'red',
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
