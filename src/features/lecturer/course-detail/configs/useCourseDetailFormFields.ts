import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppSelector } from '@app/stores';
import { CourseFormValues } from '../views/components/CourseDetailInfo/core/schema/courseDetailInfo.schema';

export const useCourseDetailFormFields = (): FormFieldConfig<CourseFormValues>[] => {
  const { categories } = useAppSelector((state) => state.courseDetailLecture);
 
  const config: FormFieldConfig<CourseFormValues>[] = [
    {
      name: 'thumbnail',
      label: 'URL hình ảnh',
      inputType: 'upload',
      grid: { xs: 12, sm: 6, md: 12 },
    },
    {
      name: 'title',
      label: 'Tiêu đề',
      inputType: 'input',
      grid: { xs: 12, sm: 6, md: 12 },
    },
    {
      name: 'price',
      label: 'Giá',
      inputType: 'input',
      type: 'number',
      grid: { xs: 12, sm: 6, md: 12 },
      unit: 'VND',
    },
    {
      name: 'category_id',
      label: 'Danh mục',
      inputType: 'select',
      grid: { xs: 12, sm: 6, md: 12 },
      selectOptions: categories.data?.map((category) => ({
        value: category.id,
        label: category.name,
      })) || [],
    },
    {
      name: 'title_description',
      label: 'Mô tả ngắn',
      inputType: 'textarea',
      grid: { xs: 12, sm: 6, md: 12 },
      inputProps: { multiline: true, rows: 4 },
    },
    {
      name: 'description',
      label: 'Mô tả chi tiết',
      inputType: 'editor',
      grid: { xs: 12, sm: 6, md: 12 },
    }
  ];

  return config;
};