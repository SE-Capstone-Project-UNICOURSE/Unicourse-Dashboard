import { useAppDispatch, useAppSelector } from '@app/stores';
import {
  Box,
  CardHeader,
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
import { useCallback, useEffect } from 'react';
import { setPageSizeTopRateCourse, setPageTopRateCourse } from '../../slices';
import { getTopRateCourses } from '../../slices/actions';
import { Star } from '@mui/icons-material';

const AnalyticsLecturerCourses = () => {
  const dispatch = useAppDispatch();
  const {
    data,
    isLoadingGetTopRateCourses,
    page,
    pageSize,
    total: totalCourses,
  } = useAppSelector((state) => state.dashboardLecture.topRateCourses);

  const accessToken = localStorage.getItem('accessToken');

  const handleGetTopRateCourses = useCallback(
    (accessTokenString: string) => {
      dispatch(
        getTopRateCourses({
          accessToken: accessTokenString,
          request: { page: page + 1, pageSize },
        })
      );
    },
    [page, pageSize, dispatch]
  );

  useEffect(() => {
    if (accessToken) {
      handleGetTopRateCourses(accessToken);
    }
  }, [accessToken, handleGetTopRateCourses]);

  const handleChangePage = (event: unknown, newPage: number) => {
    if (!accessToken) return;
    dispatch(setPageTopRateCourse(newPage));
    handleGetTopRateCourses(accessToken);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!accessToken) return;
    const newSize = parseInt(event.target.value, 10);
    dispatch(setPageSizeTopRateCourse(newSize));
    dispatch(setPageTopRateCourse(0));
    handleGetTopRateCourses(accessToken);
  };

  return (
    <Card>
      <CardHeader
        style={{ paddingBottom: 20 }}
        title="Khoá học tốt nhất"
        subheader="Bảng xếp hạng"
      />

      <TableContainer component={Paper} variant="elevation">
        {isLoadingGetTopRateCourses ? (
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
                <TableCell align="center" sx={{ width: '20%' }}>
                  Hình ảnh
                </TableCell>
                <TableCell align="left" sx={{ width: '20%' }}>
                  Tên khoá học
                </TableCell>
                <TableCell sx={{ width: '20%' }} align="center">
                  Giá (VND)
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
                  <TableCell align="center">
                    <img
                      src={row.course.thumbnail}
                      style={{ borderRadius: 10 }}
                      alt={row.course.title}
                    />
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.course.title}
                  </TableCell>
                  <TableCell align="center">{row.course.price}</TableCell>
                  <TableCell align="center">{row.course.students_enrolled}</TableCell>
                  <TableCell align="center">
                    {row.averageRating} <Star color="warning" fontSize="inherit" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography style={{ padding: '20px', textAlign: 'center' }}>
            No top-rated courses available.
          </Typography>
        )}
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCourses}
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

export default AnalyticsLecturerCourses;
