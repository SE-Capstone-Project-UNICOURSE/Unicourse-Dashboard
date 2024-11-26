import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { CourseFormValues } from '../views/components/CourseDetailInfo/core/schema/courseDetailInfo.schema';
import { resetDynamicArrayField, setCourseDetail, setDynamicArrayItems, setPreviewImage } from '../slices';
import { useEffect, useState } from 'react';

export const useCourseDetailFormFields = ({ reRender } : { reRender: boolean }): FormFieldConfig<CourseFormValues>[] => {
  const { categories } = useAppSelector((state) => state.courseDetailLecture);
  const { data } = useAppSelector((state) => state.courseDetailLecture.courseDetail);
  const dispatch = useAppDispatch();

  const [config, setConfig] = useState<FormFieldConfig<CourseFormValues>[]>([]);

  const handleUpdatePreviewImage = (imageUrl: string) => {
    dispatch(setPreviewImage(imageUrl));
  };

  // Dispatch dynamic array actions inside useEffect to sync with data
  useEffect(() => {
    if (data) {
      // Reset dynamic array fields state and set new values
      dispatch(resetDynamicArrayField('learning_outcome'));
      dispatch(resetDynamicArrayField('requirements'));

      // Set dynamic array items to Redux store
      dispatch(setDynamicArrayItems({
        fieldName: 'learning_outcome',
        items: data.learning_outcome || [],
      }));

      dispatch(setDynamicArrayItems({
        fieldName: 'requirements',
        items: data.requirements || [],
      }));

      // Update course detail in Redux
      dispatch(setCourseDetail(data));
    }
  }, [data, dispatch]); // Dependencies: only when `data` changes

  // Dynamically update the config whenever `data` or `categories` change
  useEffect(() => {
    if (!data) return;

    setConfig([
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
        inputType: 'input',
        grid: { xs: 12, sm: 6, md: 12 },
        inputProps: { multiline: true, rows: 4 },
      },
      {
        name: 'description',
        label: 'Mô tả chi tiết',
        inputType: 'editor',
        grid: { xs: 12, sm: 6, md: 12 },
      },
      {
        name: 'learning_outcome',
        label: 'Mục tiêu học tập',
        inputType: 'array',
        grid: { xs: 12, sm: 12, md: 12 },
        arrayProps: {
          column: 2,
          placeholder: 'Nhập mục tiêu học tập',
          buttonText: 'Thêm mục tiêu',
          initialValues: data?.learning_outcome || [''],
          fieldName: 'learning_outcome',
          onValueChange: (value) => {},
          notifyIsValid: (isValid) => {},
        },
      },
      {
        name: 'requirements',
        label: 'Yêu cầu khóa học',
        inputType: 'array',
        grid: { xs: 12, sm: 12, md: 12 },
        arrayProps: {
          column: 2,
          placeholder: 'Nhập yêu cầu khóa học',
          buttonText: 'Thêm yêu cầu',
          initialValues: data?.requirements || [''],
          fieldName: 'requirements',
          onValueChange: (value) => {},
          notifyIsValid: (isValid) => {},
        },
      },
    ]);
  }, [data, categories, reRender]); // Dependencies: Update when `data` or `categories` change

  return config;
};