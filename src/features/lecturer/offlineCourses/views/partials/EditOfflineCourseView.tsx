import GradientButton from '@app/common/components/atoms/GradientButton';
import { APP_COLOR } from '@app/common/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { ArrowBackIos, CheckCircleRounded, RadioButtonChecked } from '@mui/icons-material';
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
import { FormProvider } from 'react-hook-form';
import { editSteps } from '../../constants';
import {
  setEditCourseInstruction,
  setScreenState,
  setSelectedCourseData,
  setSelectedCourseEditId,
} from '../../slices';
import { courseMentorEditFormValues } from '../../types/courseMentorEditFormValues';
import useEditOfflineCourseViewModel from '../../viewmodels/useEditOfflineCourseViewModel';
import EditCourseOfflineForm from '../components/EditCourseOfflineForm';
import VerticalStepInstruction from '../components/VerticalStepInstruction';
import EditOfflineCourseCalendarListView from './EditOfflineCourseCalendarListView';

const EditOfflineCourseView = () => {
  const { activeEditStep, openEditCourseInstructior } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { methods } = useEditOfflineCourseViewModel();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(setEditCourseInstruction(open));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormProvider {...methods}>
            <EditCourseOfflineForm methods={methods} />
          </FormProvider>
        );
      case 1:
        return <EditOfflineCourseCalendarListView />;
      case 2:
        return <Box> Text </Box>;
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <GradientButton
          style={{ marginBottom: 20 }}
          variant="outlined"
          onClick={() => {
            dispatch(setSelectedCourseEditId(undefined));
            dispatch(setSelectedCourseData(null));
            dispatch(setScreenState('list'));
            methods.reset(courseMentorEditFormValues);
          }}
        >
          <ArrowBackIos /> Danh sách khoá học
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
        open={openEditCourseInstructior}
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

      <Stepper activeStep={activeEditStep} alternativeLabel>
        {editSteps.map((label, index) => {
          const isDone = index < activeEditStep;
          const isSelected = index === activeEditStep;

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
        {renderStepContent(activeEditStep)}
      </Box>
    </Paper>
  );
};

export default EditOfflineCourseView;
