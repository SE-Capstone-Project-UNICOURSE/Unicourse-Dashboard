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
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (field.value) {
      if (typeof field.value === 'string' && showPreview) {
        // Nếu là chuỗi (link), set preview thành URL
        setPreview(field.value);
      } else if (typeof field.value === 'object' && showPreview) {
        // Nếu là file, tạo URL tạm thời
        setPreview(URL.createObjectURL(field.value as File));
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [field.value, showPreview]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const fileUrl = URL.createObjectURL(file); // Tạo URL cho file
        onFileUpload?.(fileUrl); // Callback để xử lý file (nếu cần)
        field.onChange(file); // Lưu file vào `field.value`
        if (showPreview) {
          setPreview(fileUrl); // Cập nhật preview
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
    onDeleteFile?.(typeof fileUrl === 'string' ? fileUrl : ''); // Xử lý xóa link (nếu cần)
    field.onChange(null); // Xóa giá trị trong `field`
    setPreview(null); // Xóa preview

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (preview.startsWith('data:image/') || preview.startsWith('http')) {
      // Nếu là ảnh, hiển thị preview
      return <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '4px' }} />;
    } else {
      // Hiển thị tên file nếu không phải là ảnh
      return (
        <Typography variant="body2" color="textSecondary">
          File uploaded: {typeof field.value === 'object' ? (field.value as File).name : 'Unknown'}
        </Typography>
      );
    }
  };

  return (
    <Box>
      <Typography>{label}</Typography>
      {!field.value && !loading ? (
        // Nút tải lên
        <Button variant="contained" component="label" startIcon={<UploadIcon />}>
          Upload
          <input ref={inputRef} accept={accept} type="file" hidden onChange={handleFileChange} />
        </Button>
      ) : loading ? (
        // Hiển thị vòng xoay khi đang tải lên
        <Button
          variant="outlined"
          component="label"
          startIcon={<CircularProgress size={16} color="info" />}
        >
          Uploading...
        </Button>
      ) : (
        // Nút xóa file
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
      {error && ( // Hiển thị lỗi nếu có
        <Typography variant="body2" color="error" mt={1}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

export default memo(UploadField);
