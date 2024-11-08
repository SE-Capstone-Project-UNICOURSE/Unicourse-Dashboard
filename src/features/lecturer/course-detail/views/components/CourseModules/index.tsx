import React from 'react';
import { Typography, Box, List, ListItem, Button, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Stack, Divider } from '@mui/material';
import './CourseModules.scss';
import { Course } from '@app/common/models/Course';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import ListTopic from './components/ListTopic';

interface CourseModulesProps {
  loading: boolean;
  courseDetail: Course | undefined;
}

const CourseModules: React.FC<CourseModulesProps> = ({ loading, courseDetail }) => {
  if (loading || !courseDetail) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box className="course-modules">
      <Typography variant="h6">Nội dung khoá học</Typography>
      <List>
        {courseDetail.chapter &&
          courseDetail.chapter.map((item, index) => (
            <ListItem key={index} sx={{ paddingX: 0 }}>
              <Accordion sx={{ width: '100%', alignContent: 'center' }}>
                <AccordionSummary
                  expandIcon={<GridExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                  sx={{ paddingY: 2 }}
                >
                    <Typography variant='subtitle1' sx={{ width: '50%', flexShrink: 0 }}>{item.title}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.topic.length} bài học</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ListTopic topics={item.topic} />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
      </List>
      <Button variant="contained" color="primary">
        Thêm chương mục
      </Button>
    </Box>
  );
};

export default CourseModules;
