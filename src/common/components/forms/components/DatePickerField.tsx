import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface DatePickerFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
}

function DatePickerField<T extends FieldValues>({
  label,
  field,
  error,
  helperText,
}: DatePickerFieldProps<T>) {
  const { onChange, value } = field;

  return (
    <DatePicker
      label={label}
      inputRef={field.ref}
      value={value ? dayjs(value) : null}
      onChange={(date: Dayjs | null) => onChange(date ? date.toISOString().split('T')[0] : '')}
      slotProps={{
        textField: { error, helperText, fullWidth: true },
      }}
    />
  );
}

export default DatePickerField;
