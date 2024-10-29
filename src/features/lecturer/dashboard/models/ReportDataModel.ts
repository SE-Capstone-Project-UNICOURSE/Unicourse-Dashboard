// Defines the data for each day, including transactions, enrollments, and feedback counts.
interface DailyData {
  total_amount_transaction: number;
  total_student_enrollments: number;
  total_courses_feedback: number;
}

// Defines weekly data by mapping a date string to `DailyData`.
interface WeeklyData {
  [date: string]: DailyData; // Key is a date string (e.g., "2024-10-14")
}

// Defines monthly data by mapping a week identifier to `WeeklyData`.
interface MonthlyData {
  [week: string]: WeeklyData; // Key is a week identifier (e.g., "Week 1", "Week 2")
}

// Defines yearly data by mapping a month name to `MonthlyData`.
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

export default ReportData;
