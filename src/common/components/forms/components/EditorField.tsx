// EditorField.tsx
import { Box } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface EditorFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
}

function EditorField<T extends FieldValues>({ label, field }: EditorFieldProps<T>) {
  return (
    <Box>
      <Box mb={1}>{label}</Box>
      <Editor
        apiKey="kvvobsrb95sskboun6nxg20hndep4tm17ygjgc73bqwi5bu2"
        initialValue={field.value || ''}
        onEditorChange={(content) => field.onChange(content)}
      />
    </Box>
  );
}

export default EditorField;
