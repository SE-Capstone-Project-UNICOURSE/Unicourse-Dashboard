import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppSelector } from '@app/stores';
import { useFormContext } from 'react-hook-form';
import { CourseMentorSessionFormValues } from '../types/courseMentorSessionFormValues';

export const useCourseCalendarFormFields = (): FormFieldConfig<CourseMentorSessionFormValues>[] => {
  const { data, isLoadingGetRooms } = useAppSelector(
    (state) => state.listCourseOfflineLecture.rooms
  );
  const {
    formState: { errors },
  } = useFormContext<CourseMentorSessionFormValues>();

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
        },
        end: {
          name: 'end_date',
          label: 'Ngày kết thúc',
          error: !!errors.date_range?.end_date?.message,
          helperText: errors.date_range?.end_date?.message,
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
