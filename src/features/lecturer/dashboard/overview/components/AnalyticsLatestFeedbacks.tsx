import { setUserInfo } from '@app/features/auth/slices';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import helpers from '@app/utils/helpers';
import { Star } from '@mui/icons-material';
import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useCallback, useEffect } from 'react';
import { LectureFeedbackCourseRequestModel } from '../../models/LectureFeedbackCourseModel';
import {
  setDataFeedback,
  setPageFeedbacksLecturer,
  setPageSizeFeedbackLecturer,
} from '../../slices';
import { getLatestFeedbackLecturer } from '../../slices/actions';

// Updated course list with revenue calculation

const AnalyticsLatestFeedbacks = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const { data, isLoadingGetLatestFeedback, page, pageSize, total } = useAppSelector(
    (state) => state.dashboardLecture.latestFeedback
  );

  const handlePressWhenErrorAuth = useCallback(() => {
    router.push('/sign-in');
    localStorage.removeItem('accessToken');
    dispatch(setUserInfo(null));
  }, []);

  const handleGetLatestFeedbacks = useCallback(async () => {
    if (!accessToken) {
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Không tìm thấy session người dùng, vui lòng đăng nhập lại!',
          type: DialogType.ERROR,
          onCancel() {
            handlePressWhenErrorAuth();
          },
          onConfirm() {
            handlePressWhenErrorAuth();
          },
        })
      );
      return;
    }
    const request: LectureFeedbackCourseRequestModel = { page: page + 1, pageSize };

    dispatch(getLatestFeedbackLecturer({ accessToken, request }));
  }, [accessToken, page, pageSize]);

  const handleChangePage = (event: unknown, newPage: number) => {
    if (!accessToken) return;
    dispatch(setPageFeedbacksLecturer(newPage));
    handleGetLatestFeedbacks();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!accessToken) return;
    const newSize = parseInt(event.target.value, 10);
    dispatch(setDataFeedback([]));
    dispatch(setPageSizeFeedbackLecturer(newSize));
    dispatch(setPageFeedbacksLecturer(0));
    handleGetLatestFeedbacks();
  };

  useEffect(() => {
    handleGetLatestFeedbacks();
  }, []);

  return (
    <Card>
      <CardHeader
        style={{ paddingBottom: 20 }}
        title="Đánh giá gần nhất"
        subheader="Bảng xếp hạng"
      />

      <TableContainer component={Paper} variant="elevation">
        {isLoadingGetLatestFeedback ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : data && data.length > 0 ? (
          <Table aria-label="top rates courses">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '5%' }}>
                  #
                </TableCell>
                <TableCell align="left" sx={{ width: '20%' }}>
                  Tên khoá học
                </TableCell>
                <TableCell sx={{ width: '20%' }} align="center">
                  Nội dung
                </TableCell>
                <TableCell sx={{ width: '20%' }} align="center">
                  Học viên
                </TableCell>
                <TableCell sx={{ width: '25%' }} align="center">
                  Đánh giá (5/5)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>

                  <TableCell align="left" component="th" scope="row">
                    {row.course_title}
                  </TableCell>
                  <TableCell align="left">{row.content}</TableCell>
                  <TableCell align="center">{helpers.formatDateToVN(row.created_at)}</TableCell>
                  <TableCell align="center">
                    {row.rating} <Star color="warning" fontSize="inherit" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography style={{ padding: '20px', textAlign: 'center' }}>
            No Feedbacks available!
          </Typography>
        )}
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelRowsPerPage="Số lượng hiển thị"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count} khoá học`}
      />
    </Card>
  );
};

export default AnalyticsLatestFeedbacks;
