import { Course } from '@app/common/models/Course';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import './CourseHeader.scss';

interface CourseDetailHeaderProps {
  loading: boolean;
  courseDetail: Course | undefined;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({
  loading,
  courseDetail,
}) => {

  if (loading || !courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container className="course-detail-header" direction="row" spacing={0}>
      <Grid item xs={8} md={6} className="course-detail-header__grid">
        <Typography variant="h4">Thông tin chi tiết</Typography>
      </Grid>
    </Grid>
  );
};

export default CourseDetailHeader;
