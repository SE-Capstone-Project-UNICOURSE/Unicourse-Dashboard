import { Box, TextField, TextFieldProps } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export interface DateRangeProps<T extends FieldValues> {
  start: {
    name: string;
    label: string;
    inputProps?: TextFieldProps;
  };
  end: {
    name: string; // Same here for the `end` field
    label: string;
    inputProps?: TextFieldProps;
  };
}

interface DateRangeFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  dateInfo: DateRangeProps<T>;
}

function DateRangeField<T extends FieldValues>({
  field,
  error,
  helperText,
  dateInfo,
}: DateRangeFieldProps<T>) {
  const { onChange, name, ref } = field;

  return (
    <Box display="flex" gap={2}>
      <TextField
        label={dateInfo.start.label}
        type="date"
        variant="outlined"
        fullWidth
        error={error}
        helperText={helperText}
        InputLabelProps={{ shrink: true }}
        value={field.value?.[dateInfo.start.name as string] || ''}
        onChange={(e) =>
          onChange({
            ...field.value,
            [dateInfo.start.name]: e.target.value.toString(),
          })
        }
      />
      <TextField
        label={dateInfo.end.label}
        type="date"
        variant="outlined"
        fullWidth
        error={error}
        helperText={helperText}
        InputLabelProps={{ shrink: true }}
        value={field.value?.[dateInfo.end.name as string] || ''}
        onChange={(e) =>
          onChange({
            ...field.value,
            [dateInfo.end.name]: e.target.value.toString(),
          })
        }
      />
    </Box>
  );
}

export default DateRangeField;
