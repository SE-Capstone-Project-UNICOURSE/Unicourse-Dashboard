import GradientButton from '@app/common/components/atoms/GradientButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import CreateCourseCalendarForm from '../components/CreateCourseCalendarForm';

const CreateOfflineCourseCalendarListView = () => {
  const [forms, setForms] = useState<number[]>([0]); // Store a unique ID for each form instance

  const addNewForm = () => {
    setForms((prev) => [...prev, prev.length]); // Add a new form with a unique index
  };

  const deleteForm = (formId: number) => {
    setForms((prev) => prev.filter((id) => id !== formId)); // Remove the form with the given ID
  };

  const handleSaveAllForms = () => {
    console.log('Saving all forms...');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Tạo Lịch Khóa Học Offline
      </Typography>

      {forms.map((formId) => (
        <Box
          key={formId}
          mb={4}
          p={2}
          border="1px solid #ddd"
          borderRadius={2}
          position="relative"
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          {/* Delete Button */}
          <IconButton
            onClick={() => deleteForm(formId)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'none',
            }}
            className="delete-button"
          >
            <CloseIcon />
          </IconButton>

          {/* Form Content */}
          <CreateCourseCalendarForm />
        </Box>
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <GradientButton variant="outlined" onClick={addNewForm}>
          Thêm buổi mới
        </GradientButton>

        <GradientButton onClick={handleSaveAllForms}>Lưu Tất Cả Lịch</GradientButton>
      </Box>
    </>
  );
};

export default CreateOfflineCourseCalendarListView;
