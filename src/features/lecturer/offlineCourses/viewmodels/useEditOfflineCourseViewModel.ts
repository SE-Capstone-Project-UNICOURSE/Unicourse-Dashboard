import useGetAccessRefreshToken from '@app/hooks/useGetAccessRefreshToken';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { courseMentorEditAction } from '../schema/courseMentorEditAction.schema';
import {
  courseMentorEditFormValues,
  courseMentorEditFormValuesTypes,
} from '../types/courseMentorEditFormValues';

const useEditOfflineCourseViewModel = () => {
  const {
    selectedCourseEditId,
    courseOfflineDetail: { data: courseOfflineDetail },
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const methods = useForm<courseMentorEditFormValuesTypes>({
    resolver: yupResolver(courseMentorEditAction),
    defaultValues: courseMentorEditFormValues,
  });
  const dispatch = useAppDispatch();
  const { accessToken } = useGetAccessRefreshToken();
  const router = useRouter();

  return { methods };
};

export default useEditOfflineCourseViewModel;
