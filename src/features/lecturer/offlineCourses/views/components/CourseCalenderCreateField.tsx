import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { useCourseCalendarFormFields } from '../../configs/useCourseCalendarFormFields';
import { CourseMentorSessionFormValues } from '../../types/courseMentorSessionFormValues';

type CourseCalendarCreatedFieldProps = {
  methods: UseFormReturn<CourseMentorSessionFormValues, any, undefined>;
  isDisable: boolean;
};

const CourseCalenderCreateField = ({ methods, isDisable }: CourseCalendarCreatedFieldProps) => {
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
              isDisable: true,
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

export default CourseCalenderCreateField;
