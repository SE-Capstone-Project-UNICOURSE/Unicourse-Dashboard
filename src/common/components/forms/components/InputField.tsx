import { handleKeyDown, handlePaste } from '@app/utils/inputUtils';
import { InputAdornment, InputBaseProps, TextField } from '@mui/material';
import { isNaN } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  type?: React.HTMLInputTypeAttribute;
  unit?: 'VND' | 'USD';
  inputProps?: InputBaseProps['inputProps'];
  isDisable?: boolean;
  onBlur?: () => void;
}

export type UnitCurrency = 'VND' | 'USD';

function InputField<T extends FieldValues>({
  label,
  field,
  error,
  helperText,
  type = 'text',
  unit,
  inputProps,
  isDisable,
  onBlur
}: InputFieldProps<T>) {
  const [inputValue, setInputValue] = useState<string>(field.value?.toString() || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = event.target.value;

    if (type === 'number') {
      const sanitizedValue = rawValue.replace(/,/g, '');
      if (!isNaN(Number(sanitizedValue))) {
        setInputValue(formatNumber(sanitizedValue));
        field.onChange(sanitizedValue);
      }
    } else if (type === 'text') {
      setInputValue(rawValue);
      field.onChange(rawValue);
    }
  };

  useEffect(() => {
    if (type === 'number') {
      const formattedValue = formatNumber(field.value || 0);
      setInputValue(formattedValue);
    } else {
      setInputValue(field.value?.toString() || '');
    }
  }, [field.value, type]);

  const formatNumber = (value: string | number) =>
    new Intl.NumberFormat('en-US').format(Number(value));

  return (
    <TextField
      label={unit ? `${label} (${unit})` : label}
      variant="outlined"
      fullWidth
      disabled={isDisable}
      error={error}
      helperText={helperText}
      value={inputValue}
      multiline
      rows={inputProps?.rows}
      InputProps={{
        endAdornment: unit ? <InputAdornment position="end">{unit}</InputAdornment> : null,
      }}
      inputProps={inputProps}
      onKeyDown={(e) => type === 'number' && handleKeyDown(e, type)}
      onPaste={(e) => type === 'number' && handlePaste(e, type)}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
}

export default memo(InputField);
