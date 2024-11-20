import { CheckboxProps, InputBaseProps, SxProps } from '@mui/material';
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

// Quy định chung cho các config field
interface FormFieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  unit?: string;
  grid?: { xs?: number; sm?: number; md?: number };
  inputType: InputType;
  selectOptions?: SelectOption[];
  type?: React.HTMLInputTypeAttribute;
  inputProps?: InputBaseProps['inputProps'] | CheckboxProps;
  dateRangeProps?: DateRangeProps;
  sx?: SxProps<Theme>;
  accept?: string; // for handling upload file
  onFileUpload?: (file: File) => void;
  onDeleteFile?: (fileUrl: string) => void;
  showPreview?: boolean;
  helperText?: string;
  isDisable?: boolean;
}

export type { FormFieldConfig };
