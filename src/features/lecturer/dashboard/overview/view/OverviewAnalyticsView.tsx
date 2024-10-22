import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch } from '@app/stores';
import type { SelectChangeEvent } from '@mui/material';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import AnalyticsUI from '../components';

// ----------------------------------------------------------------------
type OptionSelectedFilter = 'Week' | 'Month' | 'Year';
const OverviewAnalyticsView = () => {
  const [optionSelected, setOptionSelected] = useState<OptionSelectedFilter>('Month');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<OptionSelectedFilter>) => {
    setOptionSelected(event.target.value as OptionSelectedFilter);
  };

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
          Bảng điều khiển giáo viên đào tạo
        </Typography>

        <FormControl sx={{ minWidth: 200, width: { xs: '100%', sm: '300px' } }}>
          <InputLabel shrink>Chọn lọc theo</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={optionSelected}
            onChange={handleChange}
            label="Chọn lọc theo" // Ensure this matches the InputLabel
          >
            <MenuItem value={'Week'}>Tuần</MenuItem>
            <MenuItem value={'Month'}>Tháng</MenuItem>
            <MenuItem value={'Year'}>Năm</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Adjusting xs, sm, and md to be the same for consistent layout */}
        <Grid xs={12} sm={6} md={4}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Tổng doanh thu"
            percent={2.6}
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Tổng giao dịch"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsUI.AnalyticsWidgetSummary
            title="Đánh giá"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AnalyticsUI.AnalyticsLecturerTransaction title="Dánh sách giao dịch" />
        </Grid>

        <Grid xs={12} md={12} lg={6}>
          <AnalyticsUI.AnalyticsTasks />
        </Grid>
        <Grid xs={12} md={12} lg={6}>
          <AnalyticsUI.AnalyticsFeedbacks />
        </Grid>
      </Grid>
    </DashboardContent>
  );
};

export default OverviewAnalyticsView;
