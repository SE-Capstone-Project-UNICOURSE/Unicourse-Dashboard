import GradientButton from '@app/common/components/atoms/GradientButton';
import { Box } from '@mui/material';
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
      {forms.map((formId) => (
        <CreateCourseCalendarForm indexItem={formId} onDelete={deleteForm} />
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <GradientButton variant="outlined" onClick={addNewForm}>
          Trở về
        </GradientButton>

        <Box>
          <GradientButton variant="outlined" onClick={addNewForm}>
            Thêm buổi mới
          </GradientButton>
          <GradientButton onClick={handleSaveAllForms}>Lưu Tất Cả Lịch</GradientButton>
        </Box>
      </Box>
    </>
  );
};

export default CreateOfflineCourseCalendarListView;
