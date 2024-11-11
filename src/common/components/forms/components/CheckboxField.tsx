import React from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface CheckboxFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  inputProps?: CheckboxProps;
}

function CheckboxField<T extends FieldValues>({ field, inputProps }: CheckboxFieldProps<T>) {
  return <Checkbox checked={Boolean(field.value)} {...field} {...(inputProps as CheckboxProps)} />;
}

export default CheckboxField;
