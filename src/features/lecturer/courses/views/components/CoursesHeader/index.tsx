import React from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './CoursesHeader.scss';

const CoursesHeader = () => (
  <div className="courses-header">
    <Typography variant="h4" className="courses-header__title">
      Danh Sách Khóa Học
    </Typography>
    <Button startIcon={<AddIcon />} variant="contained" color="primary">
      Thêm khóa học mới
    </Button>
  </div>
);

export default CoursesHeader;