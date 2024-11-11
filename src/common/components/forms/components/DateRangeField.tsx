import { Box, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs'; // Import dayjs for date manipulation
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export interface DateRangeProps {
  start: {
    name: string;
    label: string;
    inputProps?: TextFieldProps;
  };
  end: {
    name: string;
    label: string;
    inputProps?: TextFieldProps;
  };
}

interface DateRangeFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  dateInfo: DateRangeProps;
}

function DateRangeField<T extends FieldValues>({
  field,
  error,
  helperText,
  dateInfo,
}: DateRangeFieldProps<T>) {
  const { onChange } = field;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <DatePicker
        label={dateInfo.start.label}
        name={dateInfo.start.name}
        inputRef={field.ref}
        value={field.value?.[dateInfo.start.name] ? dayjs(field.value[dateInfo.start.name]) : null}
        onChange={(date: Dayjs | null) =>
          onChange({
            ...field.value,
            [dateInfo.start.name]: date ? date.toISOString().split('T')[0] : '',
          })
        }
        slotProps={{
          textField: { error, helperText, fullWidth: true },
        }}
      />

      <DatePicker
        label={dateInfo.end.label}
        name={dateInfo.end.name}
        value={field.value?.[dateInfo.end.name] ? dayjs(field.value[dateInfo.end.name]) : null}
        inputRef={field.ref}
        onChange={(date: Dayjs | null) =>
          onChange({
            ...field.value,
            [dateInfo.end.name]: date ? date.toISOString().split('T')[0] : '',
          })
        }
        slotProps={{
          textField: { error, helperText, fullWidth: true },
        }}
      />
    </Box>
  );
}

export default DateRangeField;
