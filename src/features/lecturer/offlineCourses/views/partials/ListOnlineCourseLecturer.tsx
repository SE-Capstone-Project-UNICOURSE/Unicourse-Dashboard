import GradientButton from '@app/common/components/atoms/GradientButton';
import { APP_COLOR } from '@app/common/constants/appConstants';
import { useAppSelector } from '@app/stores';
import helpers from '@app/utils/helpers';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Grid, Pagination, Typography } from '@mui/material';
import useListOnlineCourseLecturerViewModel from '../../viewmodels/useListOnlineCourseLecturerViewModel';
import SkeletonCourseOfflineCard from '../components/SkeletonCourseOfflineCard';

const ListOnlineCourseLecturer = () => {
  const { handleNextStep, handlePageChange, handlePrevStep, handleSelectCourse } =
    useListOnlineCourseLecturerViewModel();

  const {
    activeStep,
    selectedCourseId,
    listPublishCourses: { data, isLoadingPublishCourse, page, totalPages },
  } = useAppSelector((state) => state.listCourseOfflineLecture);

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
        <SkeletonCourseOfflineCard />
      ) : (
        <Grid container spacing={2}>
          {data.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
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
                  sx={{
                    width: '100%',
                    height: { xs: '200px', sm: '180px', md: '140px', lg: '180px' },
                    objectFit: 'cover',
                  }}
                  image={course.thumbnail}
                  alt={course.title}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      mb: 1,
                    }}
                  >
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
