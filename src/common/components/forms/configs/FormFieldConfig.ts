import { CheckboxProps, SxProps, TextFieldProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FieldValues } from 'react-hook-form';
import { DateRangeProps } from '../components/DateRangeField';

export type InputType =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'editor'
  | 'upload'
  | 'dateRange'
  | 'datePicker';

export type SelectOption = {
  value: string | number;
  label: string;
};

interface FormFieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  unit?: string;
  grid?: { xs?: number; sm?: number; md?: number };
  inputType: InputType;
  selectOptions?: SelectOption[];
  type?: React.HTMLInputTypeAttribute;
  inputProps?: TextFieldProps | CheckboxProps;
  dateRangeProps?: DateRangeProps;
  sx?: SxProps<Theme>;
}

export type { FormFieldConfig };
