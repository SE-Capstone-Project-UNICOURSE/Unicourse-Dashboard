import React from 'react';
import { Pagination } from '@mui/material';
import './CoursesPagination.scss';

const CoursesPagination = () => (
  <div className="courses-pagination">
    <Pagination count={2} color="primary" />
  </div>
);

export default CoursesPagination;