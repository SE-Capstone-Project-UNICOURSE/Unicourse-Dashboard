import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppSelector } from '@app/stores';
import { useFormContext } from 'react-hook-form';
import { CourseMentorSessionFormValues } from '../types/courseMentorSessionFormValues';

export const useCourseCalendarFormFields = (): FormFieldConfig<CourseMentorSessionFormValues>[] => {
  const {
    rooms: { data },
    offlineCourseRequest,
  } = useAppSelector((state) => state.listCourseOfflineLecture);
  const {
    formState: { errors },
  } = useFormContext<CourseMentorSessionFormValues>();

  const mentorSessions = offlineCourseRequest?.mentor_sessions || [];
  const courseStartDate = new Date(offlineCourseRequest?.start_date || '');
  const courseEndDate = new Date(offlineCourseRequest?.end_date || '');

  // Tìm phiên cuối cùng (nếu có)
  const lastSession = mentorSessions.length ? mentorSessions[mentorSessions.length - 1] : null;

  // Tính `minDate` và `maxDate` cho date range
  const minDate = lastSession
    ? new Date(lastSession.end_time) // Sau `end_time` của phiên trước
    : courseStartDate; // Ngày bắt đầu của khóa học nếu không có phiên trước

  const maxDate = courseEndDate; // Ngày kết thúc của khóa học

  const config: FormFieldConfig<CourseMentorSessionFormValues>[] = [
    {
      name: 'title',
      label: 'Tiêu đề',
      inputType: 'input',
      grid: { xs: 12, sm: 12, md: 12 },
    },
    {
      name: 'description',
      label: 'Mô tả',
      inputType: 'input',
      grid: { xs: 12, sm: 12, md: 12 },
    },
    {
      name: 'date_range',
      label: 'Khoảng thời gian',
      inputType: 'dateRange',
      grid: { xs: 12, sm: 12, md: 12 },
      dateRangeProps: {
        start: {
          name: 'start_date',
          label: 'Ngày bắt đầu',
          error: !!errors.date_range?.start_date?.message,
          helperText: errors.date_range?.start_date?.message,
          minDate,
          maxDate,
        },
        end: {
          name: 'end_date',
          label: 'Ngày kết thúc',
          error: !!errors.date_range?.end_date?.message,
          helperText: errors.date_range?.end_date?.message,
          minDate, // Sau phiên trước hoặc khóa học bắt đầu
          maxDate, // Trước ngày kết thúc của khóa học
        },
      },
    },
    {
      name: 'room_id',
      label: 'Mã phòng',
      inputType: 'select',
      type: 'number',
      grid: { xs: 12, sm: 12, md: 12 },
      selectOptions: data.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    },
  ];

  return config;
};
