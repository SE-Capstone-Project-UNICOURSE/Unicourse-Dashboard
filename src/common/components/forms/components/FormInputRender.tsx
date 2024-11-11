// FormInputRender.tsx
import { Checkbox, CheckboxProps, MenuItem, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { FormFieldConfig, SelectFieldConfig } from '../configs/FormFieldConfig';

interface FormInputRenderProps<T extends FieldValues> {
  fieldConfig: FormFieldConfig<T>;
  control: Control<T>;
  error?: boolean;
  helperText?: string;
}

function FormInputRender<T extends FieldValues>({
  fieldConfig,
  control,
  error,
  helperText,
}: FormInputRenderProps<T>) {
  const { name, label, inputType, ...rest } = fieldConfig;

  const renderInputField = () => {
    switch (inputType) {
      case 'input':
        return (
          <TextField
            label={String(label)}
            variant="outlined"
            fullWidth
            error={error}
            helperText={helperText}
            {...(rest.inputProps as TextFieldProps)}
          />
        );

      case 'select':
        return (
          <TextField
            label={String(label)}
            select
            variant="outlined"
            fullWidth
            error={error}
            helperText={helperText}
            {...(rest.inputProps as TextFieldProps)}
          >
            {(rest as SelectFieldConfig<T>).selectOptions?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case 'checkbox':
        return (
          <Checkbox
            checked={Boolean(rest.inputProps?.value)}
            {...(rest.inputProps as CheckboxProps)}
          />
        );

      case 'date':
        return (
          <TextField
            label={String(label)}
            type="date"
            variant="outlined"
            fullWidth
            error={error}
            helperText={helperText}
            InputLabelProps={{ shrink: true }}
            {...(rest.inputProps as TextFieldProps)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) =>
        React.cloneElement(renderInputField() as React.ReactElement, { ...field })
      }
    />
  );
}

export default FormInputRender;
