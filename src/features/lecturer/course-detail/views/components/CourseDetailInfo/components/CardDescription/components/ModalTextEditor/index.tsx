import React, { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

interface ModalTextEditorProps {
  originalDescription: string;
  setCurrentDescription: (value: string) => void;
}

const ModalTextEditor: React.FC<ModalTextEditorProps> = ({ originalDescription, setCurrentDescription }) => {
  const handleEditorChange = (content: string) => {
    setCurrentDescription(content); // Pass the updated content to the parent component
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Editor
        apiKey="kvvobsrb95sskboun6nxg20hndep4tm17ygjgc73bqwi5bu2"
        initialValue={originalDescription || ''}
        init={{
          height: 600,
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        }}
        onEditorChange={handleEditorChange} // Listen to editor changes
      />
    </Box>
  );
};

export default ModalTextEditor;