import GradientButton from '@app/common/components/atoms/GradientButton';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box } from '@mui/material';
import { setActiveStep } from '../../slices';
import useCreateCourseOfflineCalendarViewModel from '../../viewmodels/useCreateCourseOfflineCalendarViewModel';
import CreateCourseCalendarForm from '../components/CreateCourseCalendarForm';

const CreateOfflineCourseCalendarListView = () => {
  const dispatch = useAppDispatch();
  const { activeStep, totalForm } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { deleteForm, formRefs, handleSaveAllForms } = useCreateCourseOfflineCalendarViewModel();

  return (
    <>
      {totalForm.map((formId) => (
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

        <GradientButton onClick={handleSaveAllForms}>Lưu Tất Cả Lịch</GradientButton>
      </Box>
    </>
  );
};

export default CreateOfflineCourseCalendarListView;
