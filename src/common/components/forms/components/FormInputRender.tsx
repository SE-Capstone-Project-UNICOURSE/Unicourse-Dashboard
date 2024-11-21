import { Box, CheckboxProps, InputBaseProps, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormFieldConfig, InputType } from '../configs/FormFieldConfig';
import CheckboxField from './CheckboxField';
import DatePickerField from './DatePickerField';
import DateRangeField from './DateRangeField';
import EditorField from './EditorField';
import InputField from './InputField';
import SelectField from './SelectField';
import UploadField from './UploadField';

interface FormInputRenderProps<T extends FieldValues> {
  fieldConfig: FormFieldConfig<T>;
  control: Control<T>;
  error?: boolean;
  helperText?: string;
  isDisable?: boolean;
}

type FieldProps<T extends FieldValues> = {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  unit?: string;
  selectOptions?: { value: string | number; label: string }[];
  dateInfo?: { start: any; end: any };
  inputProps?: InputBaseProps['inputProps'] | CheckboxProps;
  sx?: SxProps<Theme>;
  onFileUpload?: (file: File) => void;
  onDeleteFile?: (fileUrl: string) => void;
  showPreview?: boolean;
  accept?: string;
  isDisable?: boolean;
};

// Render ra component form
const inputComponents: Record<InputType, React.FC<any>> = {
  input: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  dateRange: DateRangeField,
  upload: UploadField,
  editor: EditorField,
  textarea: InputField,
  datePicker: DatePickerField,
};

function FormInputRender<T extends FieldValues>({
  fieldConfig,
  control,
  error,
  helperText,
  isDisable,
}: FormInputRenderProps<T>) {
  const {
    name,
    label,
    inputType,
    unit,
    selectOptions,
    dateRangeProps,
    arrayFieldProps,
    onFileUpload,
    onDeleteFile,
    inputProps,
    ...rest
  } = fieldConfig;

  const Component: React.ComponentType<FieldProps<T>> =
    inputComponents[inputType] || (() => <Box>No Field Type Found</Box>);
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <Component
          label={label}
          field={field}
          error={error}
          helperText={helperText}
          onFileUpload={onFileUpload}
          onDeleteFile={onDeleteFile}
          inputProps={inputProps}
          unit={unit}
          selectOptions={selectOptions}
          dateInfo={dateRangeProps}
          sx={rest.sx}
          isDisable={rest.isDisable}
          {...rest}
        />
      )}
    />
  );
}

const getInputComponentKeys = () => Object.keys(inputComponents);

export default FormInputRender;
export { getInputComponentKeys };
