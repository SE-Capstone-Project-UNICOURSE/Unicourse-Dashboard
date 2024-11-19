import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppSelector } from '@app/stores';
import { courseDetailCreationFormValues } from '../types/courseDetailCreationFormValues';

export const useCourseDetailFormFields = (): FormFieldConfig<courseDetailCreationFormValues>[] => {
  const { data } = useAppSelector((state) => state.listCourseOfflineLecture.centers);

  const config: FormFieldConfig<courseDetailCreationFormValues>[] = [
    {
      name: 'title',
      label: 'Tiêu đề',
      inputType: 'input',
      grid: { xs: 12, sm: 6, md: 12 },
    },
    {
      name: 'amount',
      label: 'Số tiền',
      inputType: 'input',
      type: 'number',
      grid: { xs: 12, sm: 6, md: 12 },
      unit: 'VND',
    },
    {
      name: 'discount',
      label: 'Giảm giá',
      inputType: 'input',
      type: 'number',
      grid: { xs: 12, sm: 6, md: 12 },
      unit: '%',
    },
    {
      name: 'description',
      label: 'Mô tả',
      inputType: 'editor',
      grid: { xs: 12, sm: 6, md: 12 },
    },
    {
      name: 'image',
      label: 'URL hình ảnh',
      inputType: 'upload',
      grid: { xs: 12, sm: 6, md: 12 },
    },
    {
      name: 'center_id',
      label: 'Trung tâm',
      inputType: 'select',
      grid: { xs: 12, sm: 6, md: 12 },
      selectOptions: data.map((item) => ({
        value: item.id,
        label: item.address,
      })),
    },
    {
      name: 'date_range',
      label: 'Khoảng thời gian',
      inputType: 'date-range',
      grid: { xs: 12, sm: 6, md: 12 },
      dateRangeProps: {
        start: {
          name: 'start_date',
          label: 'Ngày bắt đầu',
        },
        end: {
          name: 'end_date',
          label: 'Ngày kết thúc',
        },
      },
    },
  ];

  return config;
};
