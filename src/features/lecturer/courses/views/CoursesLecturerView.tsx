import {
  Card,
  CardContent,
  Grid,
  Box,
  Pagination,
  Typography,
  Button,
  CardHeader,
  Stack,
  Autocomplete,
  TextField,
} from '@mui/material';
import { useCallback, useState } from 'react';
import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import './CourseLecturerView.scss';
import CourseTable from './components/CourseTable';
import CoursesHeader from './components/CoursesHeader';
import CoursesPagination from './components/CoursesPagination';
import TableHeader from './components/TableHeader';

const CourseLecturerView = () => {
  return (
    <DashboardContent className="container">
      {/* Header */}
      <CoursesHeader />

      {/* List of Courses */}
      <Card variant="outlined">
        {/* Header of the card */}
        <CardHeader component={TableHeader}
        />
        {/* Table of courses */}
        <CardContent>
          <CourseTable />
          
          {/* Pagination */}
          <CoursesPagination />
        </CardContent>
      </Card>
    </DashboardContent>
  );
};

export default CourseLecturerView;
