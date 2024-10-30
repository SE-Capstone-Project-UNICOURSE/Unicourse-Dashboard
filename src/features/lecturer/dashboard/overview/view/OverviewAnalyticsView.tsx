import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useDashboardLectureViewModel from '../../viewmodels/useDashboardLecturerViewModel';
import AnalyticsUI from '../components';

const OverviewAnalyticsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    handleChange,
    optionSelected,
    labelDataReport,
    totalAmountTransactionForLabelDataReport,
    totalEnrolledForLabelDataReport,
    totalFeedbackForLabelDataReport,
  } = useDashboardLectureViewModel();
  const { reportData, isLoadingGetReport } = useAppSelector((state) => state.dashboardLecture);

  return (
    <DashboardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        py={2}
      >
        <Typography variant="h3" sx={{ mb: { xs: 2, sm: 0 } }}>
          Thông số giảng viên
        </Typography>

        <FormControl sx={{ minWidth: 200, width: { xs: '100%', sm: '300px' } }}>
          <InputLabel shrink>Chọn lọc theo</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={optionSelected}
            onChange={handleChange}
            label="Chọn lọc theo"
          >
            <MenuItem value={'Month'}>Tháng</MenuItem>
            <MenuItem value={'Year'}>Năm</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AnalyticsUI.AnalyticsWidgetSummary
            isLoading={isLoadingGetReport}
            title="Tổng doanh thu"
            percent={reportData?.commission || 0}
            type="transaction"
            total={reportData?.totalTransaction || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: labelDataReport,
              series: totalAmountTransactionForLabelDataReport,
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsUI.AnalyticsWidgetSummary
            isLoading={isLoadingGetReport}
            title="Tổng giao dịch"
            percent={2.8}
            type="enrolled"
            total={reportData?.totalCourseEnrolled || 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: labelDataReport,
              series: totalEnrolledForLabelDataReport,
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AnalyticsUI.AnalyticsWidgetSummary
            isLoading={isLoadingGetReport}
            title="Đánh giá"
            percent={3.6}
            total={reportData?.totalFeedbacks || 0}
            color="error"
            type="feedback"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: labelDataReport,
              series: totalFeedbackForLabelDataReport,
            }}
          />
        </Grid>

        <Grid xs={12} md={8} lg={8}>
          <Grid xs={12} md={6} lg={6}>
            <AnalyticsUI.AnalyticsLecturerCourses />
          </Grid>
          <Grid xs={12} md={12} lg={6} mt={1}>
            <AnalyticsUI.AnalyticsLatestFeedbacks />
          </Grid>
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <AnalyticsUI.LectureInfoOverall />
        </Grid>
      </Grid>
    </DashboardContent>
  );
};

export default OverviewAnalyticsView;
