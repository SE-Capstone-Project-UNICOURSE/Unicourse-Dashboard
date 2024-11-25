import { useAppSelector } from '@app/stores';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import DashboardLectureContent from '../../dashboard/layouts/DashboardLayout/DashboardLectureContent';
import useOfflineCourseLectureViewModel from '../viewmodels/useOfflineCourseLectureViewModel';
import CourseOfflineDetailView from './partials/CourseOfflineDetailView';
import CreateOfflineCourseView from './partials/CreateOfflineCourseView';
import ListOfflineCourseLecturer from './partials/ListOfflineCourseLecturer';

const OfflineCourseLectureView: React.FC = () => {
  const { screenState } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { handleCreateNewCourse, handleChangePage } = useOfflineCourseLectureViewModel();

  const renderContent = () => {
    switch (screenState) {
      case 'add':
        return <CreateOfflineCourseView />;
      case 'list':
        return (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4" gutterBottom>
                Danh sách khóa học trực tiếp
              </Typography>
              <Button variant="contained" color="primary" onClick={handleCreateNewCourse}>
                Tạo khóa học mới
              </Button>
            </Box>
            <ListOfflineCourseLecturer handleChangePage={handleChangePage} />
          </>
        );
      case 'detail':
        return <CourseOfflineDetailView />;
      default:
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="body1" paragraph>
              Không tìm thấy nội dung phù hợp.
            </Typography>
          </div>
        );
    }
  };

  return <DashboardLectureContent>{renderContent()}</DashboardLectureContent>;
};

export default OfflineCourseLectureView;
