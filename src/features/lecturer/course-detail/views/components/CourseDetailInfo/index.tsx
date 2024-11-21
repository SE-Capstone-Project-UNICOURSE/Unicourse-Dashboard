import { Category, Course } from '@app/common/models/Course';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import CardDescription from './components/CardDescription';
import { VisuallyHiddenInput } from './components/VisuallyHiddenInput';
import {
  courseDetailInfoValue,
  CourseFormValues,
  validationSchema,
} from './core/schema/courseDetailInfo.schema';
import { validationArrayString } from './core/services/validateService';
import './CourseDetailInfo.scss';
import { useCourseDetailFormFields } from '../../../configs/useCourseDetailFormFields';
import { useAppDispatch } from '@app/stores';
import FormInputRender from '@app/common/components/forms/components/FormInputRender';
import GradientButton from '@app/common/components/atoms/GradientButton';

interface CourseDetailProps {
  loading: boolean;
  courseDetail: Course | undefined;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const CourseDetailInfo: React.FC<CourseDetailProps> = ({
  loading,
  courseDetail,
  editMode,
  setEditMode,
}) => {
  const dispatch = useAppDispatch();
  const formFields = useCourseDetailFormFields();
  const [imageFile, setImageFile] = useState<string>('');
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

  // FORM ZONE
  // Use useForm to manage form state
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: courseDetailInfoValue,
  });

  // INITIALIZE ZONE
  useEffect(() => {
    if (courseDetail) {
      reset({
        title: courseDetail.title,
        price: courseDetail.price,
        title_description: courseDetail.title_description,
        description: courseDetail.description,
        learning_outcome: courseDetail.learning_outcome,
        requirements: courseDetail.requirements,
        category_id: courseDetail.category_id,
      });
    }
  }, [courseDetail, reset]);

  // Call reset form from another component
  useEffect(() => {
    if (!editMode) {
      reset();
      setImageFile('');
    }
  }, [editMode]);

  const onSubmit = (data: CourseFormValues) => {
    console.log('Form submitted:', data);
  };

  const hanleResetForm = () => {
    reset();
    setEditMode(false);
  }

  const selectFile = (files: any) => {
    const file = URL.createObjectURL(files[0]);
    setImageFile(file);
    setEditMode(true);
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
          <GradientButton variant="outlined">Hủy</GradientButton>

          <GradientButton type="submit">Lưu thay đổi</GradientButton>
        </Box>

        {/* Dynamic Sections: Learning Outcomes */}
        {/* <Box className="course-info__section" mt={4}>
          <Typography className="course-info__section-title" variant="h6">
            Mục tiêu học tập
          </Typography>
          {outcomeFields.map((field, index) => (
            <Grid container key={field.id} alignItems="center" spacing={2}>
              <Grid item xs={10}>
                <FormInputRender
                  fieldConfig={{
                    name: `learning_outcome.${index}`,
                    label: '',
                    inputType: 'input',
                    grid: { xs: 12 },
                  }}
                  control={control}
                  error={!!errors.learning_outcome?.[index]}
                  helperText={errors.learning_outcome?.[index]?.message}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="error" onClick={() => removeOutcome(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button startIcon={<AddIcon />} onClick={() => appendOutcome('')}>
            Thêm mục tiêu
          </Button>
        </Box> */}

        {/* Dynamic Sections: Requirements */}
        {/* <Box className="course-info__section" mt={4}>
          <Typography className="course-info__section-title" variant="h6">
            Yêu cầu khóa học
          </Typography>
          {requirementFields.map((field, index) => (
            <Grid container key={field.id} alignItems="center" spacing={2}>
              <Grid item xs={10}>
                <FormInputRender
                  fieldConfig={{
                    name: `requirements.${index}`,
                    label: '',
                    inputType: 'input',
                    grid: { xs: 12 },
                  }}
                  control={control}
                  error={!!errors.requirements?.[index]}
                  helperText={errors.requirements?.[index]?.message}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="error" onClick={() => removeRequirement(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button startIcon={<AddIcon />} onClick={() => appendRequirement('')}>
            Thêm yêu cầu
          </Button>
        </Box> */}
      </Box>
    </form>
  );
};

export default CourseDetailInfo;
