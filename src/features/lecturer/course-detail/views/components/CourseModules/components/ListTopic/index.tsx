import { Topic } from '@app/common/models/Course';
import { Box, Button, Divider, Grid, Paper, Stack, styled, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import TopicIcon from '@mui/icons-material/Topic';
import QuizIcon from '@mui/icons-material/Quiz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';

interface ListTopicProps {
  topics: Topic[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const CustomizeIcon = ({ item }: { item: Topic }) => {
  if (item.element_topic.video_id) {
    return <VideocamIcon />;
  } else if (item.element_topic.question_bank_id) {
    return <QuizIcon />;
  } else if (item.element_topic.document_id) {
    return <ArticleIcon />;
  } else {
    return <TopicIcon />;
  }
};

const ListTopic: React.FC<ListTopicProps> = ({ topics }) => {
  if (!topics) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box className="course-modules">
      <Stack spacing={2}>
        {topics.map((item, index) => (
          <Item key={item.id}>
            <Grid container>
              <Grid item xs={10}>
                <Stack direction="row" spacing={2}>
                  <CustomizeIcon item={item} />
                  <Typography variant="subtitle1">{item.title}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Button size="small" variant="text" startIcon={<VisibilityIcon />}>
                  Xem chi tiết
                </Button>
              </Grid>
            </Grid>
            {index !== topics.length - 1 && <Divider sx={{ paddingBottom: 2 }} />}
          </Item>
        ))}
      </Stack>
    </Box>
  );
};

export default ListTopic;
