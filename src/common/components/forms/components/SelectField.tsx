import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { SelectOption } from '../configs/FormFieldConfig';

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  selectOptions: SelectOption[];
  inputProps?: TextFieldProps;
  isDisable: boolean;
}

function SelectField<T extends FieldValues>({
  label,
  field,
  error,
  helperText,
  selectOptions,
  inputProps,
  isDisable,
}: SelectFieldProps<T>) {
  return (
    <TextField
      label={label}
      select
      variant="outlined"
      fullWidth
      error={error}
      disabled={isDisable}
      helperText={helperText}
      {...field}
      {...(inputProps as TextFieldProps)}
    >
      {selectOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default SelectField;
