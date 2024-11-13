import { Box, CheckboxProps, SxProps, TextFieldProps } from '@mui/material';
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
}

type FieldProps<T extends FieldValues> = {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  unit?: string;
  selectOptions?: { value: string | number; label: string }[];
  dateInfo?: { start: any; end: any };
  inputProps?: TextFieldProps | CheckboxProps;
  sx?: SxProps<Theme>;
};

const inputComponents: Record<InputType, React.FC<any>> = {
  input: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  dateRange: DateRangeField,
  upload: UploadField,
  editor: EditorField,
  datePicker: DatePickerField,
};

function FormInputRender<T extends FieldValues>({
  fieldConfig,
  control,
  error,
  helperText,
}: FormInputRenderProps<T>) {
  const { name, label, inputType, unit, selectOptions, dateRangeProps, ...rest } = fieldConfig;

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
          unit={unit}
          selectOptions={selectOptions}
          dateInfo={dateRangeProps}
          sx={rest.sx}
          {...rest}
        />
      )}
    />
  );
}

const getInputComponentKeys = () => Object.keys(inputComponents);

export default FormInputRender;
export { getInputComponentKeys };
