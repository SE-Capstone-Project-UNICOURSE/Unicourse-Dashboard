import GradientButton from '@app/common/components/atoms/GradientButton';
import LoadingIndicator from '@app/common/components/LoadingIndicator';
import { APP_COLOR } from '@app/common/constants/appConstants';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { PaginatedRequestParams } from '@app/stores/models';
import { showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import helpers from '@app/utils/helpers';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Grid, Pagination, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { setActiveStep, setOnlineActiveCoursePage, setSelectedCourseId } from '../../slices';
import { getPublishCourses } from '../../slices/actions';

const ListOnlineCourseLecturer = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const router = useRouter();

  const { data, isLoadingPublishCourse, pageSize, page, totalPages } = useAppSelector(
    (state) => state.listCourseOfflineLecture.listPublishCourses
  );

  const { activeStep, selectedCourseId } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );

  useEffect(() => {
    if (accessToken) {
      const request: PaginatedRequestParams = {
        page,
        pageSize,
        where: {
          status: 'PUBLISHED',
        },
      };
      dispatch(getPublishCourses({ accessToken, request }));
    } else {
      router.push('/sign-in');
      localStorage.clear();
    }
  }, [dispatch, page, pageSize, accessToken]);

  // Handlers for changing steps
  const handleNextStep = useCallback(() => {
    if (selectedCourseId === null) {
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Vui lòng chọn khóa học trước khi tiếp tục',
          type: DialogType.WARNING,
        })
      );
      return;
    }

    dispatch(setActiveStep(activeStep + 1));
  }, [dispatch, activeStep, selectedCourseId]);

  const handlePrevStep = useCallback(() => {
    if (activeStep > 1) {
      dispatch(setActiveStep(activeStep - 1));
    }
  }, [dispatch, activeStep]);

  // Handler for selecting a course
  const handleSelectCourse = (courseId: number) => {
    dispatch(setSelectedCourseId(courseId));
  };

  // Handler for changing pages
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setOnlineActiveCoursePage(value));
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#e0f7fa"
        color={APP_COLOR.info}
        p={2}
        borderRadius="8px"
        mb={3}
      >
        <InfoOutlined sx={{ color: APP_COLOR.info, mr: 1 }} />
        <Typography variant="body1">Chọn khóa học cần tạo thêm</Typography>
      </Box>

      {isLoadingPublishCourse ? (
        <LoadingIndicator loading={isLoadingPublishCourse} />
      ) : (
        <Grid container spacing={2}>
          {data.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <Card
                onClick={() => handleSelectCourse(course.id)}
                sx={{
                  cursor: 'pointer',
                  border: selectedCourseId === course.id ? '2px solid #3f51b5' : '1px solid #ccc',
                  boxShadow:
                    selectedCourseId === course.id ? '0px 0px 10px rgba(63, 81, 181, 0.5)' : 'none',
                  transition: '0.3s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={course.thumbnail}
                  alt={course.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 1,
                    }}
                  >
                    {course.title_description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Giá:</strong> {helpers.formatCurrencyVND(course.price)} VND
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Học viên đăng ký:</strong> {course.students_enrolled} học viên
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination Component */}
      <Box display="flex" justifyContent="center" my={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>

      {/* Step Navigation Controls */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <GradientButton variant="outlined" onClick={handlePrevStep} disabled={activeStep === 1}>
          Trở về
        </GradientButton>
        <GradientButton onClick={handleNextStep}>Tiếp tục</GradientButton>
      </Box>
    </Box>
  );
};

export default ListOnlineCourseLecturer;
