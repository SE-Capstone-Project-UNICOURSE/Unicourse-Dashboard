import { useAppDispatch, useAppSelector } from '@app/stores';
import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { getReportData } from '../slices/actions';
// ----------------------------------------------------------------------
type OptionSelectedFilter = 'Month' | 'Year';
const useDashboardLectureViewModel = () => {
  const dispatch = useAppDispatch();
  const [optionSelected, setOptionSelected] = useState<OptionSelectedFilter>('Month');

  const { reportData } = useAppSelector((state) => state.dashboardLecture);

  const accessToken = localStorage.getItem('accessToken');
  const handleChange = (event: SelectChangeEvent<OptionSelectedFilter>) => {
    setOptionSelected(event.target.value as OptionSelectedFilter);
  };

  console.log(reportData);

  useEffect(() => {
    dispatch(getReportData({ accessToken: accessToken || '', filterBy: optionSelected }));
  }, []);

  return { optionSelected, handleChange };
};

export default useDashboardLectureViewModel;
