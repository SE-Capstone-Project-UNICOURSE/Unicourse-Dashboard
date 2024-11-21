import { Box, CheckboxProps, TextFieldProps } from '@mui/material';
import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormFieldConfig } from '../configs/FormFieldConfig';
import CheckboxField from './CheckboxField';
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
};

const inputComponents: Record<string, React.FC<any>> = {
  input: InputField,
  select: SelectField,
  checkbox: CheckboxField,
  'date-range': DateRangeField,
  upload: UploadField,
  editor: EditorField,
  textarea: InputField,
};

function FormInputRender<T extends FieldValues>({
  fieldConfig,
  control,
  error,
  helperText,
}: FormInputRenderProps<T>) {
  const {
    name,
    label,
    inputType,
    unit,
    selectOptions,
    dateRangeProps,
    arrayFieldProps,
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
          unit={unit}
          selectOptions={selectOptions}
          dateInfo={dateRangeProps}
          {...arrayFieldProps}
          {...rest}
        />
      )}
    />
  );
}

const getInputComponentKeys = () => Object.keys(inputComponents);

export default FormInputRender;
export { getInputComponentKeys };
