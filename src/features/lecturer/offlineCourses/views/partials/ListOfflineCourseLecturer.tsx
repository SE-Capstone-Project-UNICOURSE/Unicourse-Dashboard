import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
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
import { setScreenState } from '../../slices';
import SkeletonCourseOfflineCard from '../components/SkeletonCourseOfflineCard';
import { useCallback } from 'react';

type ListOfflineCourseLecturerProps = {
  handleChangePage: (pageNumber: number) => void;
};

const ListOfflineCourseLecturer = ({ handleChangePage }: ListOfflineCourseLecturerProps) => {
  const {
    listOfflineCourse: {
      data: listOfflineCourses,
      totalPages,
      page,
      isLoadingGetListOfflineCourse,
    },
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleViewDetailCourse = useCallback(async (courseMentorId: number) => {
    router.push(`/lecturer/offline-courses/${courseMentorId}`);
    dispatch(setScreenState('detail'));
  }, []);

  console.log(isLoadingGetListOfflineCourse);

  return (
    <Box p={2}>
      {isLoadingGetListOfflineCourse ? (
        <SkeletonCourseOfflineCard />
      ) : listOfflineCourses.length > 0 ? (
        <>
          {/* Courses Grid */}
          <Grid container spacing={3}>
            {listOfflineCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                <Card>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: { xs: '150px', sm: '180px', md: '200px', lg: '220px' },
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
                        WebkitLineClamp: 3,
                        padding: 0,
                        '& *': {
                          margin: 0,
                          padding: 0,
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: course.description || 'Không có mô tả khóa học',
                      }}
                    />

                    {/* Price */}
                    <Box mt={1}>
                      <Typography variant="body1" color="primary" fontWeight="bold">
                        {helpers.formatCurrencyVND(course.amount)} VND
                      </Typography>
                    </Box>
                    {/* Discount */}
                    {course.discount > 0 && (
                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary">
                          Giảm giá: {course.discount}%
                        </Typography>
                      </Box>
                    )}
                    {/* Time Period */}
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <CalendarMonthIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="textSecondary">
                        {helpers.formatDateToVN(course.start_date)} -{' '}
                        {helpers.formatDateToVN(course.end_date)}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleViewDetailCourse(course.id)}
                      size="small"
                      color="primary"
                    >
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

          {/* Pagination */}
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
        <Typography variant="body1" color="textSecondary" textAlign="center">
          Không có khóa học nào.
        </Typography>
      )}
    </Box>
  );
};

export default ListOfflineCourseLecturer;
