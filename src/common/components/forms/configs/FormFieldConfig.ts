import { CheckboxProps, TextFieldProps } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { DateRangeProps } from '../components/DateRangeField';

export type InputType =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'editor'
  | 'upload'
  | 'date-range'
  | 'date-picker';

export type SelectOption = {
  value: string | number;
  label: string;
};

// Base field configuration with common properties
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
}

export type { FormFieldConfig };
