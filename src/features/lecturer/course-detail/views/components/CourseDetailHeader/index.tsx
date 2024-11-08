import React from 'react';
import './CourseHeader.scss';
import { Typography, Button, Grid, Stack, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Course } from '@app/common/models/Course';

interface CourseDetailHeaderProps {
  loading: boolean;
  courseDetail: Course | undefined;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({
  loading,
  courseDetail,
  editMode,
  setEditMode,
}) => {
  const handleResetValue = () => {
    setEditMode(false);
  };

  if (loading || !courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container className="course-detail-header" direction="row" spacing={0}>
      <Grid item xs={8} md={6} className="course-detail-header__grid">
        <Typography variant="h4">Thông tin chi tiết</Typography>
      </Grid>
      <Grid item xs={4} md={6} className="course-detail-header__grid">
        {/* DESKTOP VIEW */}
        <Stack
          className="course-detail-header__grid-right desktop-only"
          direction="row"
          spacing={2}
        >
          {/* <Button
            onClick={() => setEditMode(!editMode)}
            variant="outlined"
            startIcon={editMode ? <EditOffIcon /> : <EditIcon />}
          >
            {editMode ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
          </Button> */}
          <Button disabled={!editMode} onClick={() => handleResetValue()} variant="contained" endIcon={<ClearAllIcon />}>
            Reset
          </Button>
        </Stack>

        {/* MOBILE VIEW */}
        <Stack className="course-detail-header__grid-right mobile-only" direction="row" spacing={2}>
          {/* <IconButton
            onClick={() => setEditMode(!editMode)}
            color="primary"
            aria-label="delete"
            size="small"
          >
            {editMode ? <EditOffIcon fontSize="inherit" /> : <EditIcon fontSize="inherit" />}
          </IconButton> */}
          <IconButton disabled={!editMode} onClick={() => handleResetValue()} color="error" aria-label="delete" size="small">
            <ClearAllIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CourseDetailHeader;
