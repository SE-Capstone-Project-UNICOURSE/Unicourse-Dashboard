import GradientButton from '@app/common/components/atoms/GradientButton';
import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { Box } from '@mui/material';
import { addDays } from 'date-fns';
import { useEffect, useRef } from 'react';
import { setActiveStep, setTotalForm } from '../../slices';
import { getRooms } from '../../slices/actions';
import CreateCourseCalendarForm from '../components/CreateCourseCalendarForm';

const CreateOfflineCourseCalendarListView = () => {
  const formRefs = useRef<{ [key: number]: any }>({});
  const dispatch = useAppDispatch();
  const { activeStep, totalForm, offlineCourseRequest } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const { accessToken } = useGetAccessRefreshToken();
  const router = useRouter();

  const addNewForm = () => {
    dispatch(setTotalForm([...totalForm, totalForm.length]));
  };

  useEffect(() => {
    const handleFetchingRooms = () => {
      if (!accessToken) {
        router.push('/login');
        return;
      }
      const fromDate = new Date(); // Ngày hôm nay
      const toDate = addDays(fromDate, 3); // Thêm 3 ngày từ ngày hôm nay

      dispatch(
        getRooms({
          accessToken,
          centerId: offlineCourseRequest?.center_id || 0,
          fromDate: fromDate.toISOString(), // Chuyển thành ISO format
          toDate: toDate.toISOString(), // Chuyển thành ISO format
        })
      );
    };

    handleFetchingRooms();
  }, []);

  const deleteForm = (formId: number) => {
    if (totalForm.length === 1) {
      dispatch(
        showDialog({
          title: 'Warning',
          content: 'Tối thiểu 1 buổi học trong khoá học trực tiếp!',
          type: DialogType.WARNING,
        })
      );
      return;
    }
    dispatch(
      showDialog({
        title: 'Xác nhận',
        content: `Bạn có chắc chắn muốn xoá mô tả buổi ${formId + 1} không ?`,
        type: DialogType.ALERT,
        confirmButtonText: 'Có',
        onConfirm() {
          const updatedForms = totalForm.filter((id) => id !== formId);
          dispatch(setTotalForm(updatedForms.map((_, index) => index)));
          delete formRefs.current[formId];
          dispatch(hideDialog());
        },
      })
    );
  };

  const handleSaveAllForms = async () => {
    const formValues = await Promise.all(
      totalForm.map(async (formId) => {
        const formRef = formRefs.current[formId];
        if (formRef) {
          const isValid = await formRef.trigger(); // Validate form
          if (isValid) {
            return formRef.getValues(); // Lấy giá trị từ form
          }
        }
        return null; // Trả về null nếu form không hợp lệ
      })
    );

    console.log(formValues);

    const isAllValid = await Promise.all(
      totalForm.map(async (formId) => {
        const formRef = formRefs.current[formId];
        if (formRef) {
          const isValid = await formRef.trigger(); // Validate form
          return isValid;
        }
        return false;
      })
    );

    if (isAllValid.every((valid) => valid)) {
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
      {totalForm.map((formId) => (
        <CreateCourseCalendarForm
          key={formId}
          indexItem={formId}
          addNewForm={addNewForm}
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
