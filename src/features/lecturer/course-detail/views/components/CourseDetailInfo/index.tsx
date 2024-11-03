import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Chip,
  Modal,
  Grid,
  styled,
  FormHelperText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './CourseDetailInfo.scss';
import { Category, Course } from '@app/common/models/Course';
import CardDescription from './components/CardDescription';

interface CourseFormValues {
  title: string;
  price: number;
  title_description: string;
  learning_outcome?: string[] | any;
  requirements?: string[] | any;
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
  category_id: number;
  description: string;
}

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CourseDetailInfo: React.FC<CourseDetailProps> = ({ loading, courseDetail, categories, editMode, setEditMode }) => {
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<string>('');

  // VALIDATION SCHEMA
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề là bắt buộc').min(10, 'Tiêu đề cần ít nhất 10 ký tự'),
    price: Yup.number().required('Giá là bắt buộc'),
    title_description: Yup.string().required('Mô tả ngắn là bắt buộc').min(10, 'Mô tả ngắn cần ít nhất 10 ký tự'),
    learning_outcome: Yup.array().of(Yup.string().required('Mục tiêu không được bỏ trống')),
    requirements: Yup.array().of(Yup.string().required('Yêu cầu không được bỏ trống')),
    status: Yup.string().oneOf(['PUBLISHED', 'DRAFT', 'CLOSED']).required(),
    category_id: Yup.number().required('Danh mục là bắt buộc'),
    description: Yup.string().required('Mô tả khóa học là bắt buộc').min(10, 'Mô tả cần ít nhất 10 ký tự'),
  });

  const { control, register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      price: 0,
      title_description: '',
      learning_outcome: [],
      requirements: [],
      status: 'DRAFT',
      category_id: 0,
      description: '',
    },
  });

  const { fields: outcomeFields, append: appendOutcome, remove: removeOutcome } = useFieldArray({
    control,
    name: 'learning_outcome',
  });

  const { fields: requirementFields, append: appendRequirement, remove: removeRequirement } = useFieldArray({
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
        status: courseDetail.status || 'DRAFT',
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
  const handleValueChange = (field: string, value: any, shouldValidate) => {
    if (!field) return;
    setEditMode(true);
    switch (field) {
      case 'title':
        setValue('title', value, { shouldValidate });
        break;
      case 'price':
        setValue('price', value, { shouldValidate });
        break;
      case 'title_description':
        setValue('title_description', value, { shouldValidate });
        break;
      case 'status':
        setValue('status', value, { shouldValidate });
        break;
      case 'category_id':
        setValue('category_id', value, { shouldValidate });
        break;
      case 'learning_outcome':
        setValue('learning_outcome', value, { shouldValidate });
        break;
      case 'requirements':
        setValue('requirements', value, { shouldValidate });
        break;
      case 'description':
        setValue('description', value, { shouldValidate });
        break;
      default:
    }
  };

  const selectFile = (files: any) => {
    const file = URL.createObjectURL(files[0]);
    setImageFile(file);
    setEditMode(true);
  }

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
              <FormHelperText sx={{ marginLeft: 14, marginTop: 3 }} error={!!errors.description}>
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
              <Grid item xs={6}>
                <Box key={field.id} className="course-info__section__item">
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: 'white' }}
                    placeholder="Mục tiêu học tập"
                    {...register(`learning_outcome.${index}`)}
                    error={!!errors.learning_outcome?.[index]}
                    helperText={errors.learning_outcome?.[index]?.message}
                  />
                  <Box alignContent="center">
                    <IconButton color="error" onClick={() => removeOutcome(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            className="course-info__section__btn"
            onClick={() => appendOutcome('')}
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
              <Grid item xs={6}>
                <Box key={field.id} className="course-info__section__item">
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: 'white' }}
                    placeholder="Yêu cầu khóa học"
                    {...register(`requirements.${index}`)}
                    error={!!errors.requirements?.[index]}
                    helperText={errors.requirements?.[index]?.message}
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
            onClick={() => appendRequirement('')}
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