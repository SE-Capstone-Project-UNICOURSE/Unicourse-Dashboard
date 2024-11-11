// UploadField.tsx
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface UploadFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
}

function UploadField<T extends FieldValues>({ label, field }: UploadFieldProps<T>) {
  return (
    <Box>
      <TextField
        variant="outlined"
        label={label}
        fullWidth
        value={
          typeof field.value === 'object' && 'name' in field.value
            ? field.value.name
            : field.value || ''
        }
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" component="label">
                Upload
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              {field.value && (
                <IconButton onClick={() => field.onChange('')} edge="end" aria-label="clear">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      {field.value && (
        <Box mt={1}>
          <Typography variant="body2" color="textSecondary">
            {typeof field.value === 'object' && 'name' in field.value
              ? field.value.name
              : field.value}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default UploadField;
