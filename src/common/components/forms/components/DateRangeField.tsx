import { Box, Divider, TextFieldProps } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { memo } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export interface DateRangeProps {
  start: {
    name: string;
    label: string;
    inputProps?: TextFieldProps;
    error?: boolean;
    helperText?: string;
    maxDate?: Date;
    minDate?: Date;
  };
  end: {
    name: string;
    label: string;
    inputProps?: TextFieldProps;
    error?: boolean;
    helperText?: string;
    maxDate?: Date;
    minDate?: Date;
  };
}

interface DateRangeFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  dateInfo: DateRangeProps;
  isDisable: boolean;
}

function DateRangeField<T extends FieldValues>({
  field,
  dateInfo,
  isDisable,
}: DateRangeFieldProps<T>) {
  const { onChange } = field;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box width={'50%'}>
        <DesktopDateTimePicker
          label={dateInfo.start.label}
          name={dateInfo.start.name}
          inputRef={field.ref}
          value={
            field.value?.[dateInfo.start.name] ? dayjs(field.value[dateInfo.start.name]) : null
          }
          disabled={isDisable}
          maxDate={dateInfo.start.maxDate ? dayjs(dateInfo.start.maxDate) : undefined}
          minDate={dateInfo.start.minDate ? dayjs(dateInfo.start.minDate) : undefined}
          onChange={(date) =>
            onChange({
              ...field.value,
              [dateInfo.start.name]: date ? date.toISOString() : '',
            })
          }
          slotProps={{
            textField: {
              error: dateInfo.start.error,
              helperText: dateInfo.start.helperText,
              fullWidth: true,
            },
          }}
        />
      </Box>

      <Divider orientation="horizontal" style={{ width: 10 }} />
      <Box width={'50%'}>
        <DesktopDateTimePicker
          label={dateInfo.end.label}
          name={dateInfo.end.name}
          disabled={isDisable}
          value={field.value?.[dateInfo.end.name] ? dayjs(field.value[dateInfo.end.name]) : null}
          inputRef={field.ref}
          onChange={(date) =>
            onChange({
              ...field.value,
              [dateInfo.end.name]: date ? date.toISOString() : '',
            })
          }
          maxDate={dateInfo.end.maxDate ? dayjs(dateInfo.end.maxDate) : undefined}
          minDate={dateInfo.end.minDate ? dayjs(dateInfo.end.minDate) : undefined}
          slotProps={{
            textField: {
              error: dateInfo.end.error,
              helperText: dateInfo.end.helperText,
              fullWidth: true,
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(DateRangeField);
