// FormFieldConfig.ts
import { CheckboxProps, TextFieldProps } from '@mui/material';
import { Path } from 'react-hook-form';

export type SelectOption = {
  value: string | number;
  label: string;
};

type InputType = 'input' | 'select' | 'checkbox' | 'date';

// Base field configuration for text/number/date inputs
export type BaseFieldConfig<T> = {
  name: Path<T>;
  label: string;
  inputType: InputType;
  grid?: { xs?: number; sm?: number; md?: number };
  inputProps?: TextFieldProps | CheckboxProps;
};

// Extended configuration for 'select' input type
export type SelectFieldConfig<T> = BaseFieldConfig<T> & {
  inputType: 'select';
  selectOptions: SelectOption[]; // Only available for 'select' input
};

// Extended configuration for 'checkbox' input type
export type CheckboxFieldConfig<T> = BaseFieldConfig<T> & {
  inputType: 'checkbox';
  inputProps?: CheckboxProps;
};

// Extended configuration for 'date' input type
export type DateFieldConfig<T> = BaseFieldConfig<T> & {
  inputType: 'date';
  inputProps?: TextFieldProps;
};

// Union of all field configurations
export type FormFieldConfig<T> =
  | BaseFieldConfig<T>
  | SelectFieldConfig<T>
  | CheckboxFieldConfig<T>
  | DateFieldConfig<T>;
