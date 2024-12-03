import React, { useState } from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, IconButton, Menu, MenuItem, Button, Stack } from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Eye Icon for "View Detail"
import DeleteIcon from '@mui/icons-material/Delete';
import { Course } from '@app/common/models/Course';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for routing

interface CourseModulesProps {
  loading: boolean;
  courseDetail: Course | undefined;
}

const CourseModules: React.FC<CourseModulesProps> = ({ loading, courseDetail }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const navigate = useNavigate(); // Initialize the navigate function for routing

  const handleMoreVertClick = (event: React.MouseEvent<HTMLElement>, chapter: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedChapter(chapter);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteChapter = () => {
    if (selectedChapter) {
      console.log('Deleting chapter:', selectedChapter.title);
      // Call delete function here
    }
    setAnchorEl(null);
  };

  const handleViewDetail = () => {
    if (selectedChapter) {
      // courses/:id/chapters/:chapterId
      navigate(`/lecturer/courses/${courseDetail?.id}/chapters/311`); // Navigate to chapter detail page
    }
    setAnchorEl(null);
  };

  if (loading || !courseDetail) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box className="course-modules">
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Nội dung khoá học</Typography>

      {courseDetail.chapter?.map((item, index) => (
        <Accordion key={index} sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              {item.title}
            </Typography>
            <Typography sx={{ width: '30%', color: 'text.secondary' }}>{item.topic.length} bài học</Typography>
            <IconButton onClick={(e) => handleMoreVertClick(e, item)} sx={{ marginLeft: 2 }}>
              <MoreVertIcon />
            </IconButton>
          </AccordionSummary>

          <AccordionDetails>
            <List>
              {item.topic.map((topic, topicIndex) => (
                <ListItem key={topicIndex}>
                  <ListItemText primary={topic.title} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <Stack direction="row" justifyContent="flex-start" spacing={2} mt={2}>
        <Button variant="contained" color="primary">
          Thêm chương mục
        </Button>
      </Stack>

      {/* MoreVert menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {/* View Detail Menu Item */}
        <MenuItem onClick={handleViewDetail} sx={{ color: 'black' }}>
          <VisibilityIcon sx={{ marginRight: 1 }} />
          Xem chi tiết
        </MenuItem>

        {/* Delete Menu Item */}
        <MenuItem onClick={handleDeleteChapter} sx={{ color: 'red' }}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          Xóa
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CourseModules;