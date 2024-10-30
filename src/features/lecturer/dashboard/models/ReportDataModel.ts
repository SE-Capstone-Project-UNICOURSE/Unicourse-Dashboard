// Defines the data for each day, including transactions, enrollments, and feedback counts.
interface DailyData {
  date: string; // Adding the date field based on the screenshot
  total_amount_transaction: number;
  total_student_enrollments: number;
  total_courses_feedback: number;
}

type WeeklyData = DailyData[];

interface MonthlyData {
  [week: string]: WeeklyData;
}

interface YearlyData {
  [month: string]: MonthlyData; // Key is the month name (e.g., "January", "February")
}

// Main report data structure that can adapt to monthly or yearly data.
interface ReportData {
  totalTransaction: number;
  totalCourseEnrolled: number;
  totalFeedbacks: number;
  commission: number; // Commission percentage
  results: YearlyData | MonthlyData; // Main results; can be YearlyData or MonthlyData based on the report scope.
}

export type { WeeklyData, DailyData, MonthlyData, YearlyData };
export default ReportData;
