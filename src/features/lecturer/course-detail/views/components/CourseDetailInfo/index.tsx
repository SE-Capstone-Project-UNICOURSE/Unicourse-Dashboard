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

interface CourseDetailProps {
  loading: boolean;
  courseDetail: Course | undefined;
  categories: {
    isLoadingGetCategories: boolean;
    data: Array<Category> | undefined;
  };
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const CourseDetailInfo: React.FC<CourseDetailProps> = ({
  loading,
  courseDetail,
  categories,
  editMode,
  setEditMode,
}) => {
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<string>('');

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: courseDetailInfoValue,
  });

  const {
    fields: outcomeFields,
    append: appendOutcome,
    remove: removeOutcome,
  } = useFieldArray({
    control,
    name: 'learning_outcome',
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: 'requirements',
  });

  // INITIALIZE ZONE
  useEffect(() => {
    if (courseDetail) {
      reset({
        title: courseDetail.title || '',
        price: courseDetail.price || 0,
        title_description: courseDetail.title_description || '',
        learning_outcome: courseDetail.learning_outcome || [],
        requirements: courseDetail.requirements || [],
        category_id: courseDetail.category_id || 0,
        description: courseDetail.description || '',
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
    // Handle form submission here
  };

  // BEHAVIOR ZONE
  // const handleValueChange = (field: string, value: any, shouldValidate) => {
  //   if (!field) return;
  //   setEditMode(true);
  //   switch (field) {
  //     case 'title':
  //       setValue('title', value, { shouldValidate });
  //       break;
  //     case 'price':
  //       setValue('price', value, { shouldValidate });
  //       break;
  //     case 'title_description':
  //       setValue('title_description', value, { shouldValidate });
  //       break;
  //     case 'status':
  //       setValue('status', value, { shouldValidate });
  //       break;
  //     case 'category_id':
  //       setValue('category_id', value, { shouldValidate });
  //       break;
  //     case 'learning_outcome':
  //       setValue('learning_outcome', value, { shouldValidate });
  //       break;
  //     case 'requirements':
  //       setValue('requirements', value, { shouldValidate });
  //       break;
  //     case 'description':
  //       setValue('description', value, { shouldValidate });
  //       break;
  //     default:
  //   }
  // };

  const handleRemoveOutcome = (index: number) => {
    // Clear errors for the specific index being removed
    clearErrors(`learning_outcome.${index}`);
    // Remove the item
    const currentLearningOutCome = watch('learning_outcome' as keyof CourseFormValues);
    const updateLearningOutcome = currentLearningOutCome.filter((_, i) => i !== index);
    // Assign the new array to the field
    setValue('learning_outcome', updateLearningOutcome, { shouldValidate: true });
  };

  const handleAddOutcome = () => {
    const currentLearningOutcome = watch('learning_outcome' as keyof CourseFormValues) || [];
    let allFieldsValid = true;
  
    // Validate existing items in the learning_outcome array
    currentLearningOutcome.forEach((item, index) => {
      // Validate each item using validationArrayString without calling setValue
      const isValidField = validationArrayString(setError, clearErrors, 'learning_outcome', currentLearningOutcome, index);
      if (!isValidField) {
        allFieldsValid = false; // Mark as invalid if any field fails validation
      }
    });
  
    // Only append a new empty item if all existing items are valid
    if (allFieldsValid) {
      appendOutcome('');
    }
  };

  const handleRequirement = () => {
    const currentRequirements = watch('requirements' as keyof CourseFormValues) || [];
    let allFieldsValid = true;
  
    // Validate existing items in the requirements array
    currentRequirements.forEach((item, index) => {
      // Validate each item using validationArrayString without calling setValue
      const isValidField = validationArrayString(setError, clearErrors, 'requirements', currentRequirements, index);
      if (!isValidField) {
        allFieldsValid = false; // Mark as invalid if any field fails validation
      }
    });
  
    // Only append a new empty item if all existing items are valid
    if (allFieldsValid) {
      appendRequirement('');
    }
  }
  

  const handleValueChange = (field: string, value: any, shouldValidate = true) => {
    if (!field) return;
    setEditMode(true);

    const arrayFieldMatch = field.match(/^(\w+)\.(\d+)$/);
    if (arrayFieldMatch) {
      const arrayFieldName = arrayFieldMatch[1]; // e.g., "learning_outcome"
      const index = parseInt(arrayFieldMatch[2], 10); // e.g., 0

      // Use watch to get the current array value
      const currentArray = watch(arrayFieldName as keyof CourseFormValues) || [];
      const updatedArray = [...currentArray];
      updatedArray[index] = value;

      // Validate without calling setValue
      validationArrayString(setError, clearErrors, arrayFieldName, updatedArray, index);
    } else {
      // Directly set non-array fields
      setValue(field as keyof CourseFormValues, value, { shouldValidate });
    }
  };

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
        <Grid className="course-info__header" container spacing={2}>
          <Grid item xs={8} className="course-info__header-left">
            {/* Editable Fields */}
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white' }}
              label="Tiêu đề"
              {...register('title')}
              onChange={(e) => handleValueChange('title', e.target.value, true)}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white' }}
              label="Giá"
              type="number"
              {...register('price')}
              onChange={(e) => handleValueChange('price', e.target.value, true)}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white' }}
              label="Mô tả ngắn"
              {...register('title_description')}
              onChange={(e) => handleValueChange('title_description', e.target.value, true)}
              error={!!errors.title_description}
              helperText={errors.title_description?.message}
            />

            <Box>
              <CardDescription
                description={watch('description')}
                onChangeDescription={handleValueChange}
              />
              <FormHelperText
                sx={{ marginLeft: '14px', marginTop: '3px' }}
                error={!!errors.description}
              >
                {errors.description?.message}
              </FormHelperText>
            </Box>
          </Grid>

          <Grid item xs={4} className="course-info__header-right">
            <Box className="course-info__header-right-image" display="flex" justifyContent="center">
              {imageFile ? (
                <img src={imageFile} alt="Thumbnail" />
              ) : (
                <img src={courseDetail.thumbnail} alt={courseDetail.title} loading="lazy" />
              )}
            </Box>
            <Button
              className="course-info__header-right-btn"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              {imageFile ? 'Tải ảnh lên' : 'Cập nhật ảnh mới'}
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => selectFile(event.target.files)}
                accept="image/*"
              />
            </Button>
          </Grid>
        </Grid>

        {/* Learning Outcome Section */}
        <Box className="course-info__section">
          <Typography className="course-info__section-title" variant="h6">
            Học viên sẽ học được gì?
          </Typography>
          <Grid container spacing={2}>
            {outcomeFields.map((field, index) => (
              <Grid item xs={6} key={field.id}>
                {/* Make sure `key` is set to `field.id` */}
                <Box className="course-info__section__item">
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: 'white' }}
                    placeholder="Mục tiêu học tập"
                    {...register(`learning_outcome.${index}` as const)}
                    error={!!errors.learning_outcome?.[index]}
                    helperText={errors.learning_outcome?.[index]?.message}
                    onChange={(e) =>
                      handleValueChange(`learning_outcome.${index}`, e.target.value, false)
                    }
                    onBlur={(e) =>
                      setValue(`learning_outcome.${index}`, e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Box alignContent="center">
                    <IconButton color="error" onClick={() => handleRemoveOutcome(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            className="course-info__section__btn"
            onClick={() => handleAddOutcome()}
            startIcon={<AddIcon />}
          >
            Thêm mục tiêu
          </Button>
        </Box>

        {/* Requirements Section */}
        <Box className="course-info__section">
          <Typography className="course-info__section-title" variant="h6">
            Yêu cầu khóa học
          </Typography>
          <Grid container spacing={2}>
            {requirementFields.map((field, index) => (
              <Grid item xs={6} key={field.id}>
                {' '}
                {/* Make sure `key` is set to `field.id` */}
                <Box className="course-info__section__item">
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: 'white' }}
                    placeholder="Yêu cầu khóa học"
                    {...register(`requirements.${index}`)}
                    error={!!errors.requirements?.[index]}
                    helperText={errors.requirements?.[index]?.message}
                    onChange={(e) =>
                      handleValueChange(`requirements.${index}`, e.target.value, false)
                    }
                    onBlur={(e) =>
                      setValue(`requirements.${index}`, e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Box alignContent="center">
                    <IconButton color="error" onClick={() => removeRequirement(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            className="course-info__section__btn"
            onClick={() => handleRequirement()}
            startIcon={<AddIcon />}
          >
            Thêm yêu cầu
          </Button>
        </Box>

        {/* Status and Category Select */}
        {/* <Box>
          <Chip
            label={
              courseDetail.status === 'PUBLISHED'
                ? 'Published'
                : courseDetail.status === 'DRAFT'
                  ? 'Draft'
                  : 'Closed'
            }
            color="success"
          />
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select {...field} disabled={!editMode} fullWidth>
                {categories &&
                  categories.data &&
                  categories.data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </Box> */}
      </Box>

      {/* Modal for Editing Description */}
      <Modal open={descriptionModalOpen} onClose={() => setDescriptionModalOpen(false)}>
        <Box className="modal-box">
          <Button onClick={() => setDescriptionModalOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </form>
  );
};

export default CourseDetailInfo;
