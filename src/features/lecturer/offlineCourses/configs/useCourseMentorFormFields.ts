import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { useFormContext } from 'react-hook-form';
import { setPreviewImage } from '../slices';
import { courseMentorCreationFormValues } from '../types/courseMentorCreationFormValues';

const useCourseMentorFormFields = (): FormFieldConfig<courseMentorCreationFormValues>[] => {
  const { data } = useAppSelector((state) => state.listCourseOfflineLecture.centers);
  const dispatch = useAppDispatch();

  const {
    formState: { errors },
  } = useFormContext<courseMentorCreationFormValues>();

  const handleUpdatePreviewImage = (imageUrl: string) => {
    dispatch(setPreviewImage(imageUrl));
  };

  const config: FormFieldConfig<courseMentorCreationFormValues>[] = [
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
      grid: { xs: 12, sm: 12, md: 12 },
      inputProps: { maxLength: 3, max: '100', min: '0' },
      unit: '%',
    },
    {
      name: 'description',
      label: 'Mô tả',
      inputType: 'editor',
      grid: { xs: 12, sm: 12, md: 12 },
    },
    {
      name: 'image',
      label: 'URL hình ảnh',
      inputType: 'upload',
      grid: { xs: 12, sm: 12, md: 12 },
      accept: 'image/png,image/jpeg',
      onFileUpload: (imageUrl) => handleUpdatePreviewImage(imageUrl),
      showPreview: true,
    },
    {
      name: 'center_id',
      label: 'Trung tâm',
      inputType: 'select',
      grid: { xs: 12, sm: 12, md: 12 },
      selectOptions: data.map((item) => ({
        value: item.id,
        label: item.address,
      })),
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
          minDate: new Date(),
        },
        end: {
          name: 'end_date',
          label: 'Ngày kết thúc',
          error: !!errors.date_range?.end_date?.message,
          helperText: errors.date_range?.end_date?.message,
          minDate: new Date(),
        },
      },
    },
  ];

  return config;
};

export default useCourseMentorFormFields;
