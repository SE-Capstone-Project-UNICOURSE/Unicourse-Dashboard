import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { addDays } from 'date-fns';
import { useEffect, useRef } from 'react';
import { setActiveStep, setOfflineCourseRequest, setTotalEditForm, setTotalForm } from '../slices';
import { getRooms } from '../slices/actions';

const useEditOfflineCourseCalendarListViewModel = () => {
  const formRefs = useRef<{ [key: number]: any }>({});
  const {
    offlineCourseRequest,
    totalEditForm,
    activeStep,
    courseOfflineDetail: { data: courseOfflineDetail },
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const { accessToken } = useGetAccessRefreshToken();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleFetchingRooms = () => {
      if (!accessToken) {
        router.push('/login');
        return;
      }
      const fromDate = new Date();
      const toDate = addDays(fromDate, 3);

      dispatch(
        getRooms({
          accessToken,
          centerId: offlineCourseRequest?.center_id || 0,
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString(),
        })
      );
    };

    handleFetchingRooms();
  }, []);

  useEffect(() => {
    if (courseOfflineDetail?.mentor_session?.length) {
      const updatedTotalEditForm = [...totalEditForm];

      courseOfflineDetail.mentor_session.forEach((_, index) => {
        updatedTotalEditForm.push(index + 1 + 1); // Add an incremental value for each session
      });

      console.log(updatedTotalEditForm);

      dispatch(setTotalEditForm(updatedTotalEditForm));
    }
  }, []);

  const deleteForm = (formId: number) => {
    if (totalEditForm.length === 1) {
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
          const updatedForms = totalEditForm.filter((id) => id !== formId);
          dispatch(setTotalForm(updatedForms.map((_, index) => index)));
          delete formRefs.current[formId];
          if (offlineCourseRequest) {
            dispatch(
              setOfflineCourseRequest({
                ...offlineCourseRequest,
                mentor_sessions: offlineCourseRequest.mentor_sessions.filter(
                  (value) => value.position !== formId
                ),
              })
            );
          }
          dispatch(hideDialog());
        },
      })
    );
  };

  const handleSaveAllForms = async () => {
    const isAllValid = await Promise.all(
      totalEditForm.map(async (formId) => {
        const formRef = formRefs.current[formId];
        if (formRef) {
          const isValid = await formRef.trigger();
          return isValid;
        }
        return false;
      })
    );

    if (isAllValid.every((valid) => valid)) {
      console.log(totalEditForm);

      const lastFormId = totalEditForm[totalEditForm.length - 1];
      console.log('lastFormId', lastFormId);

      if (lastFormId !== undefined && formRefs.current[lastFormId]) {
        await formRefs.current[lastFormId].handleSubmit();
      }
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

  return { formRefs, handleSaveAllForms, deleteForm };
};

export default useEditOfflineCourseCalendarListViewModel;
