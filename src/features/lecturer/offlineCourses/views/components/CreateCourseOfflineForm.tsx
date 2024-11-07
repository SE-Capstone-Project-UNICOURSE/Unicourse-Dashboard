import { Box, TextField } from '@mui/material';

const CreateCourseOfflineForm = () => {
  return (
    <Box>
      <TextField label="Tên khóa học" variant="outlined" fullWidth margin="normal" name="name" />
    </Box>
  );
};

export default CreateCourseOfflineForm;
