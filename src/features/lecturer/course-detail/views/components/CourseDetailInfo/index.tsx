import GradientButton from '@app/common/components/atoms/GradientButton';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useCourseDetailFormFields } from '../../../configs/useCourseDetailFormFields';
import { resetDynamicArrayField } from '../../../slices';
import { CourseFormValues } from './core/schema/courseDetailInfo.schema';
import './CourseDetailInfo.scss';

interface CourseDetailProps {
  methods: UseFormReturn<CourseFormValues, any, undefined>;
}

const CourseDetailInfo: React.FC<CourseDetailProps> = ({ methods }) => {
  const dispatch = useAppDispatch();

  const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);
  const formFieldsFromHook = useCourseDetailFormFields();

  const {
    reset,
    control,
    formState: { errors },
  } = methods;

  const handleResetForm = () => {
    dispatch(resetDynamicArrayField('learning_outcome'));
    dispatch(resetDynamicArrayField('requirements'));
    reset();
  };

  if (courseDetail.isLoadingGetCourseDetail || !courseDetail.data) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="course-info">
      <Grid container spacing={2}>
        {formFieldsFromHook.map((fieldConfig) => (
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
        <GradientButton variant="outlined" onClick={() => handleResetForm()}>
          Hủy
        </GradientButton>
        <GradientButton type="submit">Lưu thay đổi</GradientButton>
      </Box>
    </Box>
  );
};

export default CourseDetailInfo;
