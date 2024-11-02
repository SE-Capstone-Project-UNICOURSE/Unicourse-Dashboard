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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './CourseDetailInfo.scss';
import { Category, Course } from '@app/common/models/Course';

interface CourseFormValues {
  title: string;
  price: number;
  title_description: string;
  thumbnail: string;
  learning_outcome?: string[] | undefined | any;
  requirements?: string[] | undefined | any;
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
  category_id: number;
}

interface CourseDetailProps {
  loading: boolean;
  courseDetail: Course | undefined;
  categories: {
    isLoadingGetCategories: boolean;
    data: Array<Category> | undefined;
  };
  editMode: boolean;
}

const CourseDetailInfo: React.FC<CourseDetailProps> = ({ loading, courseDetail, categories, editMode }) => {
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    price: Yup.number().required('Giá là bắt buộc'),
    title_description: Yup.string().required('Mô tả ngắn là bắt buộc'),
    thumbnail: Yup.string().url('Ảnh không hợp lệ').required('Ảnh là bắt buộc'),
    learning_outcome: Yup.array().of(Yup.string().required('Mục tiêu không được bỏ trống')),
    requirements: Yup.array().of(Yup.string().required('Yêu cầu không được bỏ trống')),
    status: Yup.string().oneOf(['PUBLISHED', 'DRAFT', 'CLOSED']).required(),
    category_id: Yup.number().required('Danh mục là bắt buộc'),
  });

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      price: 0,
      title_description: '',
      thumbnail: '',
      learning_outcome: [],
      requirements: [],
      status: 'DRAFT',
      category_id: 0,
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

  const onSubmit = (data: CourseFormValues) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  if (loading || !courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="course-info">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {/* Editable Fields */}
            <TextField
              fullWidth
              label="Tiêu đề"
              {...register('title')}
              disabled={!editMode}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              label="Giá"
              type="number"
              {...register('price')}
              disabled={!editMode}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              fullWidth
              label="Mô tả ngắn"
              {...register('title_description')}
              disabled={!editMode}
              error={!!errors.title_description}
              helperText={errors.title_description?.message}
            />
            <TextField
              fullWidth
              label="Thumbnail URL"
              {...register('thumbnail')}
              disabled={!editMode}
              error={!!errors.thumbnail}
              helperText={errors.thumbnail?.message}
            />
            <Button variant="contained" onClick={() => setDescriptionModalOpen(true)} disabled={!editMode}>
              Edit Description
            </Button>
          </Grid>

          <Grid item xs={4}>
            {/* Read-Only Fields */}
            <Typography variant="body1">ID: {courseDetail.id}</Typography>
            <Typography variant="body1">Students Enrolled: {courseDetail.students_enrolled}</Typography>
            <Typography variant="body1">Last Updated: {courseDetail.updated_at}</Typography>
            <Typography variant="body1">Lecture ID: {courseDetail.lecture_id}</Typography>
          </Grid>
        </Grid>

        {/* Learning Outcome Section */}
        <Box>
          <Typography variant="h6">Learning Outcomes</Typography>
          {outcomeFields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center">
              <TextField
                fullWidth
                placeholder="Learning Outcome"
                {...register(`learning_outcome.${index}`)}
                disabled={!editMode}
                error={!!errors.learning_outcome?.[index]}
                helperText={errors.learning_outcome?.[index]?.message}
              />
              {editMode && (
                <IconButton onClick={() => removeOutcome(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          {editMode && <Button onClick={() => appendOutcome('')} startIcon={<AddIcon />}>Add Outcome</Button>}
        </Box>

        {/* Requirements Section */}
        <Box>
          <Typography variant="h6">Requirements</Typography>
          {requirementFields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center">
              <TextField
                fullWidth
                placeholder="Requirement"
                {...register(`requirements.${index}`)}
                disabled={!editMode}
                error={!!errors.requirements?.[index]}
                helperText={errors.requirements?.[index]?.message}
              />
              {editMode && (
                <IconButton onClick={() => removeRequirement(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          {editMode && <Button onClick={() => appendRequirement('')} startIcon={<AddIcon />}>Add Requirement</Button>}
        </Box>

        {/* Status and Category Select */}
        <Box>
          <Chip label={courseDetail.status === 'PUBLISHED' ? 'Published' : courseDetail.status === 'DRAFT' ? 'Draft' : 'Closed'} color="success" />
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select {...field} disabled={!editMode} fullWidth>
                {categories && categories.data && categories.data.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Box>
      </Box>

      {/* Modal for Editing Description */}
      <Modal open={descriptionModalOpen} onClose={() => setDescriptionModalOpen(false)}>
        <Box className="modal-box">
          {/* Placeholder for a rich text editor component */}
          <Button onClick={() => setDescriptionModalOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </form>
  );
};

export default CourseDetailInfo;