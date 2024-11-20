import GradientButton from '@app/common/components/atoms/GradientButton';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { Box } from '@mui/material';
import { useState, useRef } from 'react';
import { setActiveStep } from '../../slices';
import CreateCourseCalendarForm from '../components/CreateCourseCalendarForm';

const CreateOfflineCourseCalendarListView = () => {
  const [forms, setForms] = useState<number[]>([0]);
  const formRefs = useRef<{ [key: number]: any }>({}); // Lưu ref của từng form
  const dispatch = useAppDispatch();
  const { activeStep } = useAppSelector((state) => state.listCourseOfflineLecture);

  const addNewForm = () => {
    setForms((prev) => [...prev, prev.length]);
  };

  const deleteForm = (formId: number) => {
    if (forms.length === 1) {
      dispatch(
        showDialog({
          title: 'Warning',
          content: 'Tối thiểu 1 buổi học trong khoá học trực tiếp!',
          type: DialogType.WARNING,
        })
      );
      return;
    }
    setForms((prev) => {
      const updatedForms = prev.filter((id) => id !== formId);
      return updatedForms.map((_, index) => index);
    });
    delete formRefs.current[formId]; // Xóa ref của form đã xóa
  };

  const handleSaveAllForms = async () => {
    const isAllValid = await Promise.all(
      forms.map(async (formId) => {
        const formRef = formRefs.current[formId];
        if (formRef) {
          const isValid = await formRef.trigger(); // Validate form
          return isValid;
        }
        return false;
      })
    );

    if (isAllValid.every((valid) => valid)) {
      console.log('All forms are valid!');
      dispatch(setActiveStep(activeStep + 1));
    } else {
      console.error('Some forms are invalid');
      dispatch(
        showDialog({
          title: 'Error',
          content: 'Vui lòng kiểm tra lại thông tin trong các form!',
          type: DialogType.ERROR,
        })
      );
    }
  };

  return (
    <>
      {forms.map((formId) => (
        <CreateCourseCalendarForm
          key={formId}
          indexItem={formId}
          onDelete={deleteForm}
          formRef={(ref) => {
            formRefs.current[formId] = ref;
          }}
        />
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <GradientButton variant="outlined" onClick={() => dispatch(setActiveStep(activeStep - 1))}>
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
