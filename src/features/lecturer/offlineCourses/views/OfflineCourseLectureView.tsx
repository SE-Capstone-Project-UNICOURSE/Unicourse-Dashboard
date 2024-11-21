import { useAppSelector } from '@app/stores';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import DashboardLectureContent from '../../dashboard/layouts/DashboardLayout/DashboardLectureContent';
import useOfflineCourseLectureViewModel from '../viewmodels/useOfflineCourseLectureViewModel';
import CreateOfflineCourseView from './partials/CreateOfflineCourseView';

const OfflineCourseLectureView: React.FC = () => {
  const {
    listCourse: { data: courseList },
    screenState,
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { handleCreateNewCourse } = useOfflineCourseLectureViewModel();

  return (
    <DashboardLectureContent>
      {screenState === 'add' ? (
        <CreateOfflineCourseView />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" gutterBottom>
              Danh sách khóa học trực tiếp
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateNewCourse}>
              Tạo khóa học mới
            </Button>
          </Box>

          {courseList.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên khóa học</TableCell>
                    <TableCell>Giảng viên</TableCell>
                    <TableCell>Thời lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseList.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="body1" paragraph>
                Hiện tại chưa có khóa học trực tiếp nào.
              </Typography>
            </div>
          )}
        </>
      )}
    </DashboardLectureContent>
  );
};

export default OfflineCourseLectureView;
