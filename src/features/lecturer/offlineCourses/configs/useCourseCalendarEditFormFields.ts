import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppSelector } from '@app/stores';
import { useFormContext } from 'react-hook-form';
import { CourseMentorSessionFormValues } from '../types/courseMentorSessionFormValues';

export const useCourseCalendarEditFormFields =
  (): FormFieldConfig<CourseMentorSessionFormValues>[] => {
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

    const lastSession = mentorSessions.length ? mentorSessions[mentorSessions.length - 1] : null;
    const minDate = lastSession ? new Date(lastSession.end_time) : courseStartDate;
    const maxDate = courseEndDate;

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
