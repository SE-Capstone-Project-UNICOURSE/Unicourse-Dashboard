import GradientButton from '@app/common/components/atoms/GradientButton';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { Course } from '@app/common/models/Course';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCourseDetailFormFields } from '../../../configs/useCourseDetailFormFields';
import {
  courseDetailInfoValue,
  CourseFormValues,
  validationSchema,
} from './core/schema/courseDetailInfo.schema';
import './CourseDetailInfo.scss';
import { resetDynamicArrayField, submitDynamicArrayField, reset as resetData, setCourseDetail } from '../../../slices';

interface CourseDetailProps {
  id: number;
  loading: boolean;
  courseDetail: Course | undefined;
  originalCourse: Course | undefined;
}

const CourseDetailInfo: React.FC<CourseDetailProps> = ({
  id,
  loading,
  courseDetail,
  originalCourse
}) => {
  const [formFields, setFormFields] = useState<FormFieldConfig<CourseFormValues>[]>([]);
  const [reRender, setReRender] = useState(false);
  
  const formFieldsFromHook = useCourseDetailFormFields({ reRender });
  const dispatch = useAppDispatch();

  // FORM ZONE
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: courseDetailInfoValue,
  });

  // INITIALIZE ZONE
  useEffect(() => {
    console.log('formFields', formFields);
    console.log('formFieldsFromHook', formFieldsFromHook);
    if (originalCourse && originalCourse.id === id) {

      setFormFields(formFieldsFromHook);

      reset({
        title: originalCourse.title,
        price: originalCourse.price,
        title_description: originalCourse.title_description,
        description: originalCourse.description,
        learning_outcome: originalCourse.learning_outcome || [],  // Ensure it's an array
        requirements: originalCourse.requirements || [],          // Ensure it's an array
        category_id: originalCourse.category_id,
      });
    }
  }, [id, originalCourse, formFields, formFieldsFromHook]); // Add reset here to ensure form resets on courseDetail change

  // Access Redux state for dynamic array fields outside the onSubmit function
  const newLearningOutcome = useAppSelector(
    (state) => state.courseDetailLecture.dynamicArrayFields.learning_outcome
  );
  const newRequirements = useAppSelector(
    (state) => state.courseDetailLecture.dynamicArrayFields.requirements
  );

  const onSubmit = async (data: CourseFormValues) => {
    // Trigger validation for all fields
    const isValidForm= await trigger();
    dispatch(submitDynamicArrayField('learning_outcome'));
    dispatch(submitDynamicArrayField('requirements'));

    // Check if the form is valid and if dynamic array fields are valid
    if (!isValidForm || !newLearningOutcome.isValid || !newRequirements.isValid) {
      return; // Prevent form submission if invalid
    }

    // Proceed with form submission
    const finalData = {
      ...data,
      learning_outcome: newLearningOutcome.items,
      requirements: newRequirements.items,
    };
    console.log('Form submitted:', finalData);
  };

  const handleResetForm = () => {
    if (!originalCourse) {
      return;
    }
  
    dispatch(resetDynamicArrayField('learning_outcome'));
    dispatch(resetDynamicArrayField('requirements'));
    reset();
    setReRender(!reRender);
  };

  if (loading || !courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="course-info">
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
          <GradientButton variant="outlined" onClick={() => handleResetForm()}>Hủy</GradientButton>
          <GradientButton type="submit">Lưu thay đổi</GradientButton>
        </Box>
      </Box>
    </form>
  );
};

export default CourseDetailInfo;