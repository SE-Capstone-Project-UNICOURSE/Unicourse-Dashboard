import GradientButton from '@app/common/components/atoms/GradientButton';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import LoadingIndicator from '@app/common/components/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import useCourseMentorEditFormFields from '../../configs/useCourseMentorEditFormFields';
import { setActiveEditStep } from '../../slices';
import { courseMentorEditFormValuesTypes } from '../../types/courseMentorEditFormValues';
import useEditCourseOfflineFormViewModel from '../../viewmodels/useEditCourseOfflineFormViewModel';
import CourseDetailInfoCreate from './CourseDetailInfoCreate';

type CreateCourseOfflineFormProps = {
  methods: UseFormReturn<courseMentorEditFormValuesTypes, any, undefined>;
};

const EditCourseOfflineForm = ({ methods }: CreateCourseOfflineFormProps) => {
  const {
    activeEditStep,
    courseOfflineDetail: { isLoadingGetCourseOfflineDetail },
  } = useAppSelector((state) => state.listCourseOfflineLecture);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useAppDispatch();
  const { onSubmit } = useEditCourseOfflineFormViewModel({ methods });
  const formFields = useCourseMentorEditFormFields();

  return (
    <Grid container spacing={4}>
      <LoadingIndicator loading={isLoadingGetCourseOfflineDetail} />
      <Grid item xs={12} lg={8} md={7}>
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
                dispatch(setActiveEditStep(activeEditStep - 1));
              }}
            >
              Quay lại
            </GradientButton>

            <GradientButton
              type="submit"
              onClick={() => dispatch(setActiveEditStep(activeEditStep + 1))}
            >
              Tiếp tục
            </GradientButton>
          </Box>
        </form>
      </Grid>

      <Grid item xs={12} lg={4} md={5}>
        <CourseDetailInfoCreate />
      </Grid>
    </Grid>
  );
};

export default EditCourseOfflineForm;
