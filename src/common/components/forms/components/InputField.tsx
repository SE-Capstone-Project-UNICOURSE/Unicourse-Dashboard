import React from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
  unit?: string;
  inputProps?: TextFieldProps;
}

function InputField<T extends FieldValues>({
  label,
  field,
  error,
  helperText,
  type,
  unit,
  inputProps,
}: InputFieldProps<T>) {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      error={error}
      type={type}
      helperText={helperText}
      InputProps={{
        endAdornment: unit ? <InputAdornment position="end">{unit}</InputAdornment> : null,
      }}
      {...field}
      {...(inputProps as TextFieldProps)}
    />
  );
}

export default InputField;
