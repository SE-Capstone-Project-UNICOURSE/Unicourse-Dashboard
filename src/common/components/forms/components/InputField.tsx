import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
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
      {...field}
      label={label}
      variant="outlined"
      fullWidth
      error={error}
      type={type}
      helperText={helperText}
      InputProps={{
        endAdornment: unit ? <InputAdornment position="end">{unit}</InputAdornment> : null,
      }}
      {...(inputProps as TextFieldProps)}
    />
  );
}

export default InputField;
