import GradientButton from '@app/common/components/atoms/GradientButton';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box } from '@mui/material';
import { setActiveEditStep } from '../../slices';
import useEditOfflineCourseCalendarListViewModel from '../../viewmodels/useEditOfflineCourseCalendarListViewModel';
import EditCourseCalendarForm from '../components/EditCourseCalendarForm';

const EditOfflineCourseCalendarListView = () => {
  const dispatch = useAppDispatch();
  const { activeEditStep, totalForm } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { deleteForm, formRefs, handleSaveAllForms } = useEditOfflineCourseCalendarListViewModel();

  return (
    <>
      {totalForm.map((formId) => (
        <EditCourseCalendarForm
          key={formId}
          indexItem={formId}
          onDelete={deleteForm}
          formRef={(ref) => {
            formRefs.current[formId] = ref;
          }}
        />
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <GradientButton
          variant="outlined"
          onClick={() => dispatch(setActiveEditStep(activeEditStep - 1))}
        >
          Trở về
        </GradientButton>

        <GradientButton onClick={handleSaveAllForms}>Lưu Tất Cả Lịch</GradientButton>
      </Box>
    </>
  );
};

export default EditOfflineCourseCalendarListView;
