import GradientButton from '@app/common/components/atoms/GradientButton';
import { useAppDispatch, useAppSelector } from '@app/stores';
import helpers from '@app/utils/helpers';
import { Box, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { setActiveStep } from '../../slices';
import useConfirmCreateCourseOfflineViewModel from '../../viewmodels/useConfirmCreateCourseOfflineViewModel';
import CourseDetailInfoCreate from '../components/CourseDetailInfoCreate';

const ConfirmCreateOfflineCourseView = () => {
  const {
    offlineCourseRequest,
    activeStep,
    centers: { data },
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const dispatch = useAppDispatch();

  const selectedCenter = data.find((center) => center.id === offlineCourseRequest?.center_id);
  const { handleConfirmationCreateCourseOffline } = useConfirmCreateCourseOfflineViewModel();

  if (!offlineCourseRequest) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Không có thông tin khóa học</Typography>
      </Box>
    );
  }

  const { title, description, start_date, end_date, mentor_sessions, image, amount } =
    offlineCourseRequest;

  return (
    <Box>
      <Typography textAlign={'center'} variant="h4" gutterBottom>
        Xác nhận thông tin khóa học
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box gap={2}>
            <Box mb={2}>
              <img
                src={image || '/default-thumbnail.jpg'}
                alt="Thumbnail"
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  objectFit: 'cover',
                }}
              />
            </Box>

            <Typography variant="h5" gutterBottom>
              {title || 'Tiêu đề khóa học'}
            </Typography>

            <Box display="flex" gap={2} mb={4}>
              <Typography color="primary" variant="h5" fontWeight="bold">
                {helpers.formatCurrencyVND(amount)} VND
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" fontWeight="bold">
                {mentor_sessions.length} Buổi học
              </Typography>
            </Box>

            {/* Mô tả khóa học */}
            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Giới thiệu khóa học
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                paragraph
                dangerouslySetInnerHTML={{ __html: description ?? 'Không có mô tả khóa học' }}
              />
            </Box>
          </Box>
          {/* Vùng Thời gian học */}
          <Grid container spacing={2} alignItems="stretch">
            {/* Lịch */}
            <Grid item xs={12} sm={7}>
              <Typography variant="subtitle1" fontWeight="bold" mb={4}>
                Thời gian học
              </Typography>
              <Box display="flex" justifyContent="space-evenly" alignItems="center" mb={2}>
                <Typography variant="body2">
                  Ngày bắt đầu: {helpers.formatDateToVN(start_date)}
                </Typography>
                <Divider orientation="vertical" flexItem style={{ margin: '0 10px' }} />
                <Typography variant="body2">
                  Ngày kết thúc: {helpers.formatDateToVN(end_date)}
                </Typography>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  sx={{ height: '100%' }}
                  slotProps={{
                    day: (ownerState) => {
                      const day = ownerState.day;
                      const isInRange =
                        day.isAfter(dayjs(start_date).subtract(1, 'day')) &&
                        day.isBefore(dayjs(end_date).add(1, 'day'));
                      const isStart = day.isSame(dayjs(start_date), 'day');
                      const isEnd = day.isSame(dayjs(end_date), 'day');

                      return {
                        selected: isStart || isEnd, // Highlight ngày bắt đầu và kết thúc
                        sx: {
                          ...(isInRange && {
                            bgcolor: '#E3F2FD', // Màu nền cho các ngày trong phạm vi
                            color: '#000',
                            borderRadius: 0,
                          }),
                          ...(isStart && {
                            borderRadius: '50% 0 0 50%', // Bo góc trái
                          }),
                          ...(isEnd && {
                            borderRadius: '0 50% 50% 0%', // Bo góc phải
                          }),
                        },
                      };
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Danh sách buổi học */}
            <Grid item xs={12} sm={5}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Danh sách buổi học
              </Typography>
              <List>
                {mentor_sessions.map((session, index) => (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      marginBottom: 2,
                      padding: 2,
                      backgroundColor: '#fafafa',
                      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight="bold">
                          {session.title || `Buổi học ${index + 1}`}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" fontWeight="bold">
                            Thời gian:
                          </Typography>
                          <Typography variant="body2">
                            {helpers.formatDateToVN(session.start_time)} -{' '}
                            {helpers.formatDateToVN(session.end_time)}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            Phòng học: {session.room_id || 'Không có mã phòng'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {session.description || 'Không có mô tả'}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Box mb={4}>
            {/* Thông tin trung tâm */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Trung Tâm
            </Typography>
            <Typography>
              <strong>Địa chỉ:</strong> {selectedCenter?.address}
            </Typography>

            <Divider sx={{ my: 2 }} />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <GradientButton
              variant="outlined"
              onClick={() => dispatch(setActiveStep(activeStep - 1))}
            >
              Trở về
            </GradientButton>

            <GradientButton onClick={handleConfirmationCreateCourseOffline}>
              Xác nhận
            </GradientButton>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <CourseDetailInfoCreate />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmCreateOfflineCourseView;
