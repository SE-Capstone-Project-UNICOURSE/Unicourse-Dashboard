import { CheckboxProps, TextFieldProps } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { DateRangeProps } from '../components/DateRangeField';

type InputType = 'input' | 'select' | 'checkbox' | 'date' | 'editor' | 'upload' | 'date-range' | 'array' | 'textarea';

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
  dateRangeProps?: DateRangeProps<T>;
  arrayFieldProps?: {
    placeholder: string;
    minItems: number;
    maxItems: number;
  };
}

export type { FormFieldConfig };
