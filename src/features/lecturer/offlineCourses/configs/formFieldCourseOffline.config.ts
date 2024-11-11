import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { courseMentorCreationFormValues } from '../types/courseMentorCreationFormValues';

export const formFields: FormFieldConfig<courseMentorCreationFormValues>[] = [
  { name: 'title', label: 'Title', inputType: 'input', grid: { xs: 12, sm: 6, md: 4 } },
  { name: 'amount', label: 'Amount', inputType: 'input', grid: { xs: 12, sm: 6, md: 4 } },
  { name: 'discount', label: 'Discount', inputType: 'input', grid: { xs: 12, sm: 6, md: 4 } },
  { name: 'description', label: 'Description', inputType: 'input', grid: { xs: 12, sm: 6, md: 4 } },
  { name: 'image', label: 'Image URL', inputType: 'input', grid: { xs: 12, sm: 6, md: 4 } },
  { name: 'center_id', label: 'Center ID', inputType: 'input', grid: { xs: 12, sm: 6, md: 4 } },
  {
    name: 'start_date',
    label: 'Start Date',
    inputType: 'date',
    grid: { xs: 12, sm: 6, md: 4 },
    inputProps: { InputLabelProps: { shrink: true } },
  },
  {
    name: 'end_date',
    label: 'End Date',
    inputType: 'date',
    grid: { xs: 12, sm: 6, md: 4 },
    inputProps: { InputLabelProps: { shrink: true } },
  },
  {
    name: 'category',
    label: 'Category',
    inputType: 'select',
    grid: { xs: 12, sm: 6, md: 4 },
    selectOptions: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
    ],
  },
];
