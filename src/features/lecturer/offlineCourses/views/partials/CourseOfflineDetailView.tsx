import GradientButton from '@app/common/components/atoms/GradientButton';
import LoadingIndicator from '@app/common/components/LoadingIndicator';
import appColor from '@app/common/constants/appColor';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import helpers from '@app/utils/helpers';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { setScreenState } from '../../slices';

const CourseOfflineDetailView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, isLoadingGetCourseOfflineDetail } = useAppSelector(
    (state) => state.listCourseOfflineLecture.courseOfflineDetail
  );

  if (isLoadingGetCourseOfflineDetail) {
    return <LoadingIndicator loading />;
  }

  if (!data) {
    return (
      <Box>
        <Typography variant="h6" color="textSecondary" textAlign="center">
          Không tìm thấy thông tin khóa học.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <GradientButton
        style={{ marginBottom: 20 }}
        variant="outlined"
        onClick={() => {
          dispatch(setScreenState('list'));
          router.push('/lecturer/offline-courses');
        }}
      >
        <ArrowBackIosIcon /> Danh sách khoá học
      </GradientButton>

      <Grid container spacing={4}>
        {/* Course Title */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
            {data.title}
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
              __html: data.description || 'Không có mô tả khóa học',
            }}
          />
          <Typography variant="body2" color={appColor.mainColor}>
            Cập nhật {dayjs(data.updated_at).fromNow()}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" fontWeight="bold" gutterBottom color="success.main">
            <ScheduleIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Lịch trình học:
          </Typography>
          {data.mentor_session.map((session) => (
            <Card
              key={session.id}
              sx={{
                marginBottom: 1,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                {/* Title */}
                <Typography variant="h6" color="primary" gutterBottom>
                  {session.title}
                </Typography>

                <Box gap={5}>
                  {/* Description */}
                  <Typography variant="body2" color="textSecondary">
                    {session.description}
                  </Typography>

                  {/* Start and End Time */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="success.main"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      Bắt đầu: {helpers.formatDateToVN(session.start_time)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="error.main"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      Kết thúc: {helpers.formatDateToVN(session.end_time)}
                    </Typography>
                  </Box>

                  {/* Room Information */}
                  <Typography variant="body2" color="textSecondary">
                    Phòng: <strong>{session.room.name}</strong> (Sức chứa: {session.room.capacity})
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardMedia component="img" image={data.image} alt={data.title} />
            <CardContent>
              {/* Giá khóa học */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" color="#0084e2" sx={{ fontWeight: 'bold' }}>
                  {data.amount > 0 ? `${helpers.formatCurrencyVND(data.amount)} VND` : 'Miễn phí'}
                </Typography>
              </Box>

              {/* Trạng thái */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Trạng thái:
                </Typography>
                <Chip
                  label={helpers.formatStatus(data.status)}
                  sx={{
                    backgroundColor:
                      data.status === 'DRAFT'
                        ? '#FFC107'
                        : data.status === 'PUBLISHED'
                          ? '#4CAF50'
                          : '#F44336',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                />
              </Box>

              {/* Giảm giá */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Giảm giá:
                </Typography>
                <Typography variant="body2" color="textPrimary" fontWeight="bold">
                  {data.discount}%
                </Typography>
              </Box>

              {/* Địa điểm tổ chức */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Địa điểm tổ chức:
                </Typography>
                <Typography variant="body2">{data.center.name}</Typography>
                <Typography variant="body2">{data.center.address}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {data.center.description}
                </Typography>
              </Box>

              {/* Thời gian học */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="success.main"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Bắt đầu: {helpers.formatDateToVN(data.start_date)}
                </Typography>
                <Typography
                  variant="body2"
                  color="error.main"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  Kết thúc: {helpers.formatDateToVN(data.end_date)}
                </Typography>
              </Box>

              {/* Lịch */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  slotProps={{
                    day: (ownerState) => {
                      const day = ownerState.day;
                      const isInRange =
                        day.isAfter(dayjs(data.start_date).subtract(1, 'day')) &&
                        day.isBefore(dayjs(data.end_date).add(1, 'day'));
                      const isStart = day.isSame(dayjs(data.start_date), 'day');
                      const isEnd = day.isSame(dayjs(data.end_date), 'day');

                      return {
                        selected: isStart || isEnd,
                        sx: {
                          ...(isInRange && {
                            bgcolor: appColor.blue1,
                            color: '#fff',
                          }),
                        },
                      };
                    },
                  }}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseOfflineDetailView;
