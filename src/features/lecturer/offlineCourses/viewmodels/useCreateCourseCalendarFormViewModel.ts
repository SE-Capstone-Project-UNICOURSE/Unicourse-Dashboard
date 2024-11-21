/* eslint-disable camelcase */
import { useAppDispatch, useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { courseMentorSessionSchema } from '../schema/courseMentorSession.schema';
import { setOfflineCourseRequest } from '../slices';
import { CourseMentorSessionFormValues } from '../types/courseMentorSessionFormValues';

const useCreateCourseCalendarFormViewModel = (indexItem: number) => {
  const { offlineCourseRequest, totalForm } = useAppSelector(
    (state) => state.listCourseOfflineLecture
  );
  const dispatch = useAppDispatch();

  const formValueItemBaseOnIndex = offlineCourseRequest?.mentor_sessions[indexItem - 1];
  const defaultValues: CourseMentorSessionFormValues = {
    title: formValueItemBaseOnIndex?.title || '',
    description: formValueItemBaseOnIndex?.description || '',
    date_range: {
      start_date: formValueItemBaseOnIndex?.start_time || '',
      end_date: formValueItemBaseOnIndex?.end_time || '',
    },
    room_id: formValueItemBaseOnIndex?.room_id || 0,
  };

  const methods = useForm<CourseMentorSessionFormValues>({
    resolver: yupResolver(courseMentorSessionSchema),
    defaultValues,
  });

  const { setError } = methods;

  const onSubmit: SubmitHandler<CourseMentorSessionFormValues> = (data) => {
    const { start_date, end_date } = data.date_range;
    const courseStartDate = offlineCourseRequest?.start_date;
    const courseEndDate = offlineCourseRequest?.end_date;

    if (!courseStartDate || !courseEndDate) return;

    if (
      (start_date && new Date(start_date) < new Date(courseStartDate)) ||
      (end_date && new Date(end_date) > new Date(courseEndDate))
    ) {
      setError('date_range.start_date', {
        type: 'manual',
        message: 'Khoảng thời gian phải nằm trong thời gian khóa học',
      });
      return;
    }

    if (start_date && end_date && new Date(end_date) < new Date(start_date)) {
      setError('date_range.end_date', {
        type: 'manual',
        message: 'Ngày kết thúc phải sau ngày bắt đầu',
      });
      return;
    }

    // Kiểm tra nếu item đã tồn tại
    const mentorSessions = [...offlineCourseRequest.mentor_sessions];
    const existingItemIndex = mentorSessions.findIndex((session) => session.position === indexItem);

    console.log(`existingItemIndex`, existingItemIndex);

    if (existingItemIndex !== -1) {
      // Cập nhật item nếu đã tồn tại
      mentorSessions[existingItemIndex] = {
        position: indexItem,
        room_id: data.room_id,
        title: data.title,
        description: data.description,
        start_time: data.date_range.start_date,
        end_time: data.date_range.end_date,
      };
    } else {
      // Thêm mới nếu chưa tồn tại
      mentorSessions.push({
        position: totalForm.length,
        room_id: data.room_id,
        title: data.title,
        description: data.description,
        start_time: data.date_range.start_date,
        end_time: data.date_range.end_date,
      });
    }

    console.log(mentorSessions);

    dispatch(
      setOfflineCourseRequest({
        ...offlineCourseRequest,
        mentor_sessions: mentorSessions,
      })
    );
  };
  return { methods, onSubmit };
};

export default useCreateCourseCalendarFormViewModel;
