import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { useCourseCalendarFormFields } from '../../configs/useCourseCalendarFormFields';
import { CourseMentorSessionEditFormValues } from '../../types/courseMentorSessionEditFormValues';

type CourseCalendarEditFieldProps = {
  methods: UseFormReturn<CourseMentorSessionEditFormValues, any, undefined>;
  isDisable: boolean;
};

const CourseCalendarEditField = ({ methods, isDisable }: CourseCalendarEditFieldProps) => {
  const formFields = useCourseCalendarFormFields();
  const {
    control,
    formState: { errors },
  } = methods;

  return (
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
            fieldConfig={{
              ...fieldConfig,
              isDisable,
            }}
            control={control}
            error={!!errors[fieldConfig.name]}
            helperText={errors[fieldConfig.name]?.message as string}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseCalendarEditField;
