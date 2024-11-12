import { useAppDispatch } from '@app/stores';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import { setScreenState } from '../slices';

const useOfflineCourseLectureViewModel = () => {
  const dispatch = useAppDispatch();

  const handleCreateNewCourse = () => {
    dispatch(
      showDialog({
        title: 'Xác nhận',
        content: 'Bạn có chắc rằng là muốn tạo khoá học trực tiếp mới chứ ?',
        type: DialogType.ALERT,
        onCancel() {
          dispatch(hideDialog());
        },
        onConfirm() {
          dispatch(setScreenState('add'));
          dispatch(hideDialog());
        },
      })
    );
  };
  return { handleCreateNewCourse };
};

export default useOfflineCourseLectureViewModel;
