import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { CourseMentorSessionFormValues } from '../types/courseMentorSessionFormValues';

export const useCourseCalendarFormFields = (): FormFieldConfig<CourseMentorSessionFormValues>[] => {
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
      name: 'date_range', // A virtual name for grouping start and end dates
      label: 'Khoảng thời gian',
      inputType: 'date-range',
      grid: { xs: 12, sm: 12, md: 12 },
      dateRangeProps: {
        start: {
          name: 'start_time',
          label: 'Thời gian bắt đầu',
        },
        end: {
          name: 'end_time',
          label: 'Thời gian kết thúc',
        },
      },
    },
    {
      name: 'room_id',
      label: 'Mã phòng',
      inputType: 'input',
      type: 'number',
      grid: { xs: 12, sm: 12, md: 12 },
    },
  ];

  return config;
};
