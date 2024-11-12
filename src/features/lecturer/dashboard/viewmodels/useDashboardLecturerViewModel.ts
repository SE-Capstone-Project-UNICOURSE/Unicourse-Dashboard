import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { DailyData } from '../models/ReportDataModel';
import {
  setReportLabelData,
  setReportTotalAmountTransaction,
  setReportTotalEnrolled,
  setReportTotalFeedback,
} from '../slices';
import { getReportData } from '../slices/actions';

type OptionSelectedFilter = 'Month' | 'Year';

const useDashboardLectureViewModel = () => {
  const dispatch = useAppDispatch();
  const [optionSelected, setOptionSelected] = useState<OptionSelectedFilter>('Month');
  const router = useRouter();

  const { reportData } = useAppSelector((state) => state.dashboardLecture);
  const accessToken = localStorage.getItem('accessToken');

  const processReportData = () => {
    if (!reportData) return;

    const labels = reportData.results ? Object.keys(reportData.results) : [];
    const amountTransactions: number[] = [];
    const enrollments: number[] = [];
    const feedbacks: number[] = [];

    labels.forEach((month) => {
      const monthData = reportData.results[month];

      // Each monthData is expected to be a MonthlyData type (mapping weeks to DailyData)
      const monthlyTotals = {
        totalAmount: 0,
        totalEnrolled: 0,
        totalFeedback: 0,
      };

      Object.keys(monthData).forEach((week) => {
        const weekData = monthData[week] as DailyData;

        monthlyTotals.totalAmount += weekData.total_amount_transaction || 0;
        monthlyTotals.totalEnrolled += weekData.total_student_enrollments || 0;
        monthlyTotals.totalFeedback += weekData.total_courses_feedback || 0;
      });

      // Push the monthly totals to the arrays for each category
      amountTransactions.push(monthlyTotals.totalAmount);
      enrollments.push(monthlyTotals.totalEnrolled);
      feedbacks.push(monthlyTotals.totalFeedback);
    });

    // Update state with calculated values
    dispatch(setReportLabelData(labels));
    dispatch(setReportTotalAmountTransaction(amountTransactions));
    dispatch(setReportTotalEnrolled(enrollments));
    dispatch(setReportTotalFeedback(feedbacks));
  };

  // Fetch report data
  useEffect(() => {
    if (!accessToken) {
      router.push('/sign-in');
    } else {
      dispatch(getReportData({ accessToken: accessToken || '', filterBy: optionSelected }));
    }
  }, [accessToken, optionSelected, dispatch, router]);

  // Process report data when it changes
  useEffect(() => {
    processReportData();
  }, []);

  const handleChange = (event: SelectChangeEvent<OptionSelectedFilter>) => {
    setOptionSelected(event.target.value as OptionSelectedFilter);
  };

  return {
    optionSelected,
    handleChange,
  };
};

export default useDashboardLectureViewModel;
