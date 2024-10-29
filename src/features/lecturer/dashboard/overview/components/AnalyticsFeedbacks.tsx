import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import { Chart, ChartLegends, useChart } from '@app/common/components/chart';

const chartData = {
  title: 'Đánh giá trung bình',
  subheader: 'Thống kê trong tháng vừa qua',
  chart: {
    colors: undefined, // Default colors will be used if undefined
    series: [
      { label: '5 ⭐️', value: 34 },
      { label: '4 ⭐️', value: 12 },
      { label: '3 ⭐️', value: 10 },
      { label: '2 ⭐️', value: 5 },
      { label: '1 ⭐️', value: 0 },
    ],
    options: {},
  },
};

const AnalyticsFeedbacks = () => {
  const theme = useTheme();

  // Extract values for the chart
  const chartSeries = chartData.chart.series.map((item) => item.value);

  const chartColors = chartData.chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.secondary.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chartData.chart.series.map((item) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chartData.chart.options,
  });

  return (
    <Card>
      <CardHeader title={chartData.title} subheader={chartData.subheader} />

      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width={{ xs: 240, xl: 260 }}
        height={{ xs: 240, xl: 260 }}
        sx={{ my: 6, mx: 'auto' }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
};

export default AnalyticsFeedbacks;
