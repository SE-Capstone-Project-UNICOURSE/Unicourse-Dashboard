// EditorField.tsx
import { Box, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { memo } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface EditorFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
}

function EditorField<T extends FieldValues>({ label, field, error, helperText }: EditorFieldProps<T>) {
  return (
    <Box>
      <Box mb={1}>{label}</Box>
      <Editor
        apiKey="kvvobsrb95sskboun6nxg20hndep4tm17ygjgc73bqwi5bu2"
        initialValue={field.value || ''}
        onBlur={(event, editor) => {
          field.onChange(editor.getContent());
        }}
      />
      {error && ( // Display error if any
        <Typography variant="body2" color="error" mt={1}>
          { helperText }
        </Typography>
      )}
    </Box>
  );
}

export default memo(EditorField);
