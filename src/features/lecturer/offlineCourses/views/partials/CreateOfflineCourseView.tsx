import { useAppSelector } from '@app/stores';
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
import React, { useState } from 'react';
import CreateCourseOfflineForm from '../components/CreateCourseOfflineForm';
import VerticalStepInstruction from '../components/VerticalStepInstruction';

const steps = ['Tạo khoá học', 'Tạo lịch học', 'Xác nhận'];

const CreateOfflineCourseView: React.FC = () => {
  const { activeStep } = useAppSelector((state) => state.listCourseOfflineLecture);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CreateCourseOfflineForm />;
      case 1:
        return <Box>Step 2</Box>;
      case 2:
        return <Box>Step 3</Box>;
      case 3:
        return (
          <Box>
            <Typography variant="h6">Xác nhận thông tin</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tạo khóa học offline
      </Typography>
      <Button variant="outlined" onClick={toggleDrawer(true)} style={{ marginBottom: '20px' }}>
        Hiển thị hướng dẫn
      </Button>
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={drawerOpen}
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
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={3} mb={2}>
        {renderStepContent(activeStep)}
      </Box>
    </Paper>
  );
};

export default CreateOfflineCourseView;
