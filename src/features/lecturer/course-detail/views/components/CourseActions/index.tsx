import React from 'react';
import { Button, Box } from '@mui/material';
import './CourseActions.scss';

const CourseActions = () => {
  return (
    <Box className="course-actions">
      <Button variant="contained" color="primary">
        Lưu
      </Button>
      <Button variant="outlined" color="secondary">
        Revert to Draft
      </Button>
      <Button variant="outlined" color="error">
        Delete Course
      </Button>
    </Box>
  );
};

export default CourseActions;
