import GradientButton from '@app/common/components/atoms/GradientButton';
import { APP_COLOR } from '@app/common/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleRounded, RadioButtonChecked } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  Box,
  Button,
  Drawer,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { steps } from '../../constants';
import { courseMentorCreation } from '../../schema/courseMentorCreation.schema';
import { setCreateCourseInstruction, setScreenState } from '../../slices';
import {
  courseMentorCreationDefaultFormValues,
  courseMentorCreationFormValues,
} from '../../types/courseMentorCreationFormValues';
import CreateCourseOfflineForm from '../components/CreateCourseOfflineForm';
import VerticalStepInstruction from '../components/VerticalStepInstruction';
import ConfirmCreateOfflineCourseView from './ConfirmCreateOfflineCourseView';
import CreateOfflineCourseCalendarListView from './CreateOfflineCourseCalendarListView';
import ListOnlineCourseLecturer from './ListOnlineCourseLecturer';

const CreateOfflineCourseView: React.FC = () => {
  const { activeStep, openCreateCourseInstructor } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();

  const methods = useForm<courseMentorCreationFormValues>({
    resolver: yupResolver(courseMentorCreation),
    defaultValues: courseMentorCreationDefaultFormValues,
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(setCreateCourseInstruction(open));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ListOnlineCourseLecturer />;
      case 1:
        return (
          <FormProvider {...methods}>
            <CreateCourseOfflineForm methods={methods} />
          </FormProvider>
        );
      case 2:
        return <CreateOfflineCourseCalendarListView />;
      case 3:
        return <ConfirmCreateOfflineCourseView />;
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tạo khóa học trực tiếp
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <GradientButton
          style={{ marginBottom: 20 }}
          variant="outlined"
          onClick={() => dispatch(setScreenState('list'))}
        >
          <ArrowBackIosIcon /> Danh sách khoá học
        </GradientButton>

        <GradientButton
          style={{ marginBottom: 20 }}
          variant="outlined"
          onClick={toggleDrawer(true)}
        >
          Hiển thị hướng dẫn
        </GradientButton>
      </Box>

      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={openCreateCourseInstructor}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 400,
          },
        }}
      >
        <Box role="presentation" sx={{ padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Hướng dẫn từng bước
          </Typography>
          <VerticalStepInstruction />
          <Button
            onClick={toggleDrawer(false)}
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px' }}
          >
            Đóng hướng dẫn
          </Button>
        </Box>
      </Drawer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const isDone = index < activeStep;
          const isSelected = index === activeStep;

          return (
            <Step key={label} completed={isDone}>
              <StepLabel
                StepIconComponent={() => {
                  if (isDone) {
                    return <CheckCircleRounded sx={{ color: APP_COLOR.success }} />; // Done state: green check
                  } else if (isSelected) {
                    return <RadioButtonChecked sx={{ color: APP_COLOR.info }} />; // Selected state: primary color
                  } else {
                    return <RadioButtonUncheckedIcon sx={{ color: APP_COLOR.border }} />; // Unselected state: default border color
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box mt={3} mb={2}>
        {renderStepContent(activeStep)}
      </Box>
    </Paper>
  );
};

export default CreateOfflineCourseView;
