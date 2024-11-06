// Model chung cho mỗi thống kê
export interface StatisticSeriesModel {
  currentWeek: number;
  growthRate: number;
  series: number[];
}

// Model cho toàn bộ dữ liệu thống kê
export interface StatisticsData {
  transactions: StatisticSeriesModel;
  users: StatisticSeriesModel;
  lecturers: StatisticSeriesModel;
  courses: StatisticSeriesModel;
  income: StatisticSeriesModel;
}
