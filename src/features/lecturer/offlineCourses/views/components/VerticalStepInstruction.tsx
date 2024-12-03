import { useAppSelector } from '@app/stores';
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

type IStep = {
  label: string;
  description: string;
};

const creationSteps: IStep[] = [
  {
    label: 'Bước 1: Chuẩn bị tài liệu',
    description: 'Đảm bảo rằng bạn có đầy đủ tài liệu và công cụ cần thiết trước khi bắt đầu.',
  },
  {
    label: 'Bước 2: Thiết lập môi trường',
    description: 'Cài đặt và thiết lập môi trường phát triển cho dự án.',
  },
  {
    label: 'Bước 3: Hoàn thành các bước cần thiết',
    description: 'Làm theo từng bước để hoàn tất quy trình tạo khóa học.',
  },
  {
    label: 'Bước 4: Kiểm tra và xác nhận',
    description: 'Kiểm tra lại toàn bộ quy trình và xác nhận rằng mọi thứ đã hoàn thành.',
  },
];

const editSteps: IStep[] = [
  {
    label: 'Bước 2: Thiết lập môi trường',
    description: 'Cài đặt và thiết lập môi trường phát triển cho dự án.',
  },
  {
    label: 'Bước 3: Hoàn thành các bước cần thiết',
    description: 'Làm theo từng bước để hoàn tất quy trình tạo khóa học.',
  },
  {
    label: 'Bước 4: Kiểm tra và xác nhận',
    description: 'Kiểm tra lại toàn bộ quy trình và xác nhận rằng mọi thứ đã hoàn thành.',
  },
];

const VerticalStepInstruction: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState<IStep[]>(editSteps);

  const { screenState } = useAppSelector((state) => state.listCourseOfflineLecture);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (screenState === 'add') {
      setSteps(creationSteps);
    } else if (screenState === 'edit') {
      setSteps(editSteps);
    }
  }, [screenState]);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={activeStep === steps.length - 1}
                  >
                    {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Quay lại
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box sx={{ mt: 3 }}>
          <Typography>Quy trình đã hoàn thành!</Typography>
          <Button onClick={handleReset} variant="contained" sx={{ mt: 1 }}>
            Bắt đầu lại
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default VerticalStepInstruction;
