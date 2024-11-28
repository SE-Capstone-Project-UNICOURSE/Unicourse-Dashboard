import { Chapter } from '@app/features/lecturer/courses/models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Tooltip } from '@mui/material';

function ActionButtonCourseDetalList({ chapter, sx }: { chapter: Chapter, sx?: any }) {

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

export default ActionButtonCourseDetalList;
