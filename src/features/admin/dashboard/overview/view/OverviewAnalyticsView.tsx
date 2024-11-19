import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import AnalyticsUI from '../components';
import { useEffect, useState } from 'react';
import AdminDashboardService from '../../services';
import { DataResponse } from '@app/stores/models';
import { CourseData, StatisticsData, TransactionData, UserWillingData } from '../../models';
import { CircularProgress, Box } from '@mui/material';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  // Định nghĩa `statistics` với kiểu `DataResponse<StatisticsData> | null`
  const [statistics, setStatistics] = useState<DataResponse<StatisticsData> | null>(null);
  const [topCourses, setTopCourses] = useState<CourseData[]>([]);
  const [paidUsers, setPaidUsers] = useState<UserWillingData>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  // Lấy accessToken (giả sử bạn có accessToken ở đây)
  const accessToken = localStorage.getItem('accessToken') || '';

  const normalizeData = (data, length = 12) => {
    const normalized = [...data];
    while (normalized.length < length) {
      normalized.push(0); // Bổ sung giá trị 0 nếu thiếu
    }
    return normalized.slice(0, length); // Cắt nếu dư
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API getStatistics từ service
        const statsResponse = await AdminDashboardService.getStatistics(accessToken);
        setStatistics(statsResponse);

        // Gọi API getTopCourses từ service
        const topCoursesResponse = await AdminDashboardService.getTopCourses(accessToken);
        setTopCourses(topCoursesResponse.data || []);

        // Gọi API getWillingUsers từ service
        const paidUsersResponse = await AdminDashboardService.getWillingUsers(accessToken);
        setPaidUsers(paidUsersResponse.data || []);

        const response = await AdminDashboardService.getTransactions(accessToken);
        setTransactions(Array.isArray(response) ? response : []); // Gán dữ liệu giao dịch vào state
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [accessToken]);
  // Chuẩn hóa dữ liệu
  const usersData = normalizeData(statistics?.data?.users.series || []);
  const paidUsersData = normalizeData(paidUsers || []);

  // Chuẩn hóa dữ liệu giao dịch
  const mappedTransactions = transactions.map((transaction) => ({
    id: transaction.id.toString(),
    title: transaction.transactionLineItem[0]?.course_mentor?.title || 'Giao dịch',
    coverUrl: transaction.transactionLineItem[0]?.course_mentor?.image || '',
    description: transaction.description,
    postedAt: transaction.transaction_date,
    price: transaction.final_amount,
  }));

  if (!statistics) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(to bottom, #B4C5E4, #F8F9FC)', // Gradient tùy chỉnh
          color: 'black',
          gap: 2,
        }}
      >
        <CircularProgress size={60} color="inherit" />
        <Box sx={{ typography: 'h6' }}>Đang tải dữ liệu...</Box>
      </Box>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Phân Tích Tổng Quan
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Tổng doanh thu trong tuần"
            percent={statistics.data?.income.growthRate || 0}
            total={statistics.data?.income.currentWeek || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
              ],
              series: statistics.data?.income.series || [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Khóa học đã bán trong tuần"
            percent={statistics.data?.courses.growthRate || 0}
            total={statistics.data?.courses.currentWeek || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
              ],
              series: statistics.data?.courses.series || [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Người dùng mới trong tuần"
            percent={statistics.data?.users.growthRate || 0}
            total={statistics.data?.users.currentWeek || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              series: statistics.data?.users.series || [],
              categories: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
              ],
              options: {},
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Giảng viên mới trong tuần"
            percent={statistics.data?.lecturers.growthRate || 0}
            total={statistics.data?.lecturers.currentWeek || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
              ],
              series: statistics.data?.lecturers.series || [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AnalyticsUI.AnalyticsWebsiteVisits
            title="Tỷ lệ học viên mới và số lượng khoá học đăng ký"
            chart={{
              categories: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
                'Tháng 10',
                'Tháng 11',
                'Tháng 12',
              ],
              series: [
                {
                  name: 'Số học viên mới',
                  data: usersData, // Chuẩn hóa từ API users
                },
                {
                  name: 'Số lượng đã đăng ký học',
                  data: paidUsersData, // Chuẩn hóa từ API paidUsers
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AnalyticsUI.AnalyticsCurrentVisits
            title="Top 5 khoá học được mua nhiều nhất"
            chart={{
              series: topCourses
                .filter((course) => course.value > 0) // Loại bỏ các khóa học có value = 0
                .sort((a, b) => b.value - a.value) // Sắp xếp giảm dần theo value
                .slice(0, 5) // Lấy 5 phần tử đầu tiên
                .map((course) => ({
                  label: course.title, // Gắn nhãn khóa học
                  value: course.value, // Gắn giá trị khóa học
                })),
            }}
          />
        </Grid>

        {/* Số lượng giao dịch gần đây */}
        <Grid xs={12} md={6} lg={6}>
          <AnalyticsUI.AnalyticsTransactions title="Giao dịch gần đây" list={mappedTransactions} />
        </Grid>

        {/* <Grid xs={12} md={6} lg={6}>
          <AnalyticsUI.AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid> */}

        {/*    
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsUI.AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsUI.AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}
        {/* 
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsUI.AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsUI.AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'linkedin', label: 'Linkedin', total: 411213 },
              { value: 'twitter', label: 'Twitter', total: 443232 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsUI.AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
