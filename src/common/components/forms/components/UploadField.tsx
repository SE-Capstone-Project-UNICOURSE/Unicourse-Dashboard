import ClearIcon from '@mui/icons-material/Clear';
import UploadIcon from '@mui/icons-material/Upload';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface UploadFieldProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T>;
  accept?: string;
  onFileUpload?: (file: File) => Promise<string>;
  onDeleteFile?: (fileUrl: string) => void;
  showPreview?: boolean;
}

function UploadField<T extends FieldValues>({
  field,
  label,
  accept = 'image/png,image/jpeg',
  onFileUpload,
  onDeleteFile,
  showPreview = false,
}: UploadFieldProps<T>) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cập nhật preview từ `field.value` khi render lại
  useEffect(() => {
    if (field.value && typeof field.value === 'string' && showPreview) {
      setPreview(field.value); // Dùng URL đã lưu
    } else {
      setPreview(null);
    }
  }, [field.value, showPreview]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true); // Bật trạng thái loading
      try {
        const fileUrl = await onFileUpload?.(file);
        if (fileUrl) {
          field.onChange(fileUrl); // Lưu URL vào react-hook-form
          if (showPreview) {
            setPreview(fileUrl); // Cập nhật preview
          }
        }
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
        // Reset giá trị input
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  };

  const handleClear = () => {
    const fileUrl = field.value;
    onDeleteFile?.(fileUrl);
    field.onChange('');
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Box>
      <Typography>{label}</Typography>
      {!field.value && !loading ? ( // Hiển thị nút upload khi không tải ảnh
        <Button variant="contained" component="label" startIcon={<UploadIcon />}>
          Upload
          <input ref={inputRef} accept={accept} type="file" hidden onChange={handleFileChange} />
        </Button>
      ) : loading ? ( // Hiển thị loading trong quá trình tải ảnh
        <Button
          variant="outlined"
          component="label"
          startIcon={<CircularProgress size={'16'} color="info" />}
        >
          Uploading...
        </Button>
      ) : (
        // Hiển thị nút xóa khi đã có ảnh
        <Button variant="contained" color="error" startIcon={<ClearIcon />} onClick={handleClear}>
          Delete
        </Button>
      )}
      {showPreview && preview && (
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Preview:
          </Typography>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '4px' }} />
        </Box>
      )}
    </Box>
  );
}

export default UploadField;
