import { useAppDispatch } from '@app/stores';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';

const useConfirmCreateCourseOfflineViewModel = () => {
  const dispatch = useAppDispatch();

  const handleConfirmationCreateCourseOffline = () => {
    dispatch(
      showDialog({
        title: 'Xác nhận',
        content: 'Đã xác nhận toàn bộ thông tin là chính xác',
        type: DialogType.ALERT,
        onConfirm() {
          dispatch(hideDialog());
        },
      })
    );
  };
  return { handleConfirmationCreateCourseOffline };
};

export default useConfirmCreateCourseOfflineViewModel;
