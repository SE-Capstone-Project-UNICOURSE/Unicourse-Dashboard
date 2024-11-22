/* eslint-disable @typescript-eslint/no-shadow */
import ClearIcon from '@mui/icons-material/Clear';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { memo, useEffect, useRef, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface UploadFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  error?: boolean;
  helperText?: string;
  accept?: string;
  onFileUpload?: (fileUrl: string) => void;
  onDeleteFile?: (fileUrl: string) => void;
  showPreview?: boolean;
}

function UploadField<T extends FieldValues>({
  field,
  label,
  error,
  helperText,
  accept = 'image/png,image/jpeg',
  onFileUpload,
  onDeleteFile,
  showPreview = false,
}: UploadFieldProps<T>) {
  const [preview, setPreview] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (field.value && typeof field.value === 'object' && showPreview) {
      setPreview(field.value as File);
    } else {
      setPreview(null);
    }
  }, [field.value, showPreview]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const fileUrl = URL.createObjectURL(file);
        onFileUpload?.(fileUrl);
        field.onChange(file);
        if (showPreview) {
          setPreview(file);
        }
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setLoading(false);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  };

  const handleClear = () => {
    const fileUrl = field.value;
    onDeleteFile?.(fileUrl);
    field.onChange(null);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const renderPreview = () => {
    if (!preview) return null;

    const fileType = preview.type;

    if (fileType.startsWith('image/')) {
      // Render image preview
      return (
        <img
          src={URL.createObjectURL(preview)}
          alt="Preview"
          style={{ maxWidth: '100%', borderRadius: '4px' }}
        />
      );
    } else {
      // Default: Show file name if the type is unsupported
      return (
        <Typography variant="body2" color="textSecondary">
          Uploaded File: {preview.name}
        </Typography>
      );
    }
  };

  return (
    <Box>
      <Typography>{label}</Typography>
      {!field.value && !loading ? (
        // Upload Button
        <Button variant="contained" component="label" startIcon={<UploadIcon />}>
          Upload
          <input ref={inputRef} accept={accept} type="file" hidden onChange={handleFileChange} />
        </Button>
      ) : loading ? (
        // Loading Indicator
        <Button
          variant="outlined"
          component="label"
          startIcon={<CircularProgress size={16} color="info" />}
        >
          Uploading...
        </Button>
      ) : (
        // Delete Button
        <Button variant="contained" color="error" startIcon={<ClearIcon />} onClick={handleClear}>
          Delete
        </Button>
      )}
      {showPreview && preview && (
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Preview:
          </Typography>
          {renderPreview()}
        </Box>
      )}
      {error && ( // Display error if any
        <Typography variant="body2" color="error" mt={1}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

export default memo(UploadField);
