import React from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ActionButton({ sx }: { sx: any }) {
  return (
    <Stack sx={{ ...sx }} spacing={2} direction="row">
      <Tooltip title="Chỉnh sửa">
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
