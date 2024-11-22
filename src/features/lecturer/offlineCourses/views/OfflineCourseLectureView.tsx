import { useAppSelector } from '@app/stores';
import helpers from '@app/utils/helpers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import React from 'react';
import DashboardLectureContent from '../../dashboard/layouts/DashboardLayout/DashboardLectureContent';
import useOfflineCourseLectureViewModel from '../viewmodels/useOfflineCourseLectureViewModel';
import SkeletonCourseOfflineCard from './components/SkeletonCourseOfflineCard';
import CreateOfflineCourseView from './partials/CreateOfflineCourseView';

// Icons

const OfflineCourseLectureView: React.FC = () => {
  const {
    screenState,
    listOfflineCourse: {
      data: listOfflineCourses,
      totalPages,
      page,
      isLoadingGetListOfflineCourse,
    },
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { handleCreateNewCourse, handleChangePage } = useOfflineCourseLectureViewModel();

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

          {isLoadingGetListOfflineCourse ? (
            <SkeletonCourseOfflineCard />
          ) : listOfflineCourses.length > 0 ? (
            <>
              <Grid container spacing={2}>
                {listOfflineCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        sx={{
                          width: '100%',
                          height: { sm: '120px', md: '140px', lg: '180px' },
                          objectFit: 'cover',
                        }}
                        image={course.image}
                        alt={course.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                          sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2, // Giới hạn tối đa 3 dòng
                          }}
                        >
                          {course.description || 'Không có mô tả'}
                        </Typography>

                        {/* Giá */}
                        <Box display="flex" alignItems="center" mt={1}>
                          <Typography variant="body1" color="primary" fontWeight={'bold'}>
                            {helpers.formatCurrencyVND(course.amount)} VND
                          </Typography>
                        </Box>

                        {/* Giảm giá */}
                        <Box display="flex" alignItems="center" mt={1}>
                          <Typography variant="body2" color="textSecondary">
                            Giảm giá: {course.discount}%
                          </Typography>
                        </Box>

                        {/* Thời gian */}
                        <Box
                          display="flex"
                          justifyContent={'space-between'}
                          alignItems="center"
                          mt={1}
                        >
                          <CalendarMonthIcon fontSize="small" color="primary" />
                          <Typography variant="body2" color="textSecondary">
                            {helpers.formatDate(new Date(course.start_date))}
                          </Typography>
                          -
                          <Typography variant="body2" color="textSecondary">
                            {helpers.formatDate(new Date(course.end_date))}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Chi tiết
                        </Button>
                        <Button size="small" color="secondary">
                          Chỉnh sửa
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination Component */}
              <Box display="flex" justifyContent="center" my={3}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => handleChangePage(value)}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </>
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
