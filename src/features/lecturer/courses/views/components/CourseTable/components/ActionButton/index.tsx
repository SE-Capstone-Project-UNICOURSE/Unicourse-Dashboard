import React from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Course } from '@app/features/lecturer/courses/models';
import useRouter from '@app/routes/hooks/useRouter';

function ActionButton({ course, sx }: { course: Course, sx: any }) {
  const router = useRouter();

  return (
    <Stack sx={{ ...sx }} spacing={2} direction="row">
      <Tooltip onClick={() => router.push(`/lecturer/courses/${course.id}`)} title="Chỉnh sửa">
        <IconButton color="primary" aria-label="edit">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default ActionButton;
