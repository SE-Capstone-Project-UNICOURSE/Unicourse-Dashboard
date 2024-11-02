import React from 'react';
import { Typography, Box, List, ListItem, Button } from '@mui/material';
import './CourseModules.scss';

const CourseModules = () => {
  const modules = [
    'CEA201 Bài 1 - Spring 2023',
    'CEA201 Bài 2 - Spring 2023',
    // Add more modules as needed
  ];

  return (
    <Box className="course-modules">
      <Typography variant="h6">Các chương học</Typography>
      <List>
        {modules.map((module, index) => (
          <ListItem key={index}>
            <Button>{module}</Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">Thêm chương mục</Button>
    </Box>
  );
};

export default CourseModules;
