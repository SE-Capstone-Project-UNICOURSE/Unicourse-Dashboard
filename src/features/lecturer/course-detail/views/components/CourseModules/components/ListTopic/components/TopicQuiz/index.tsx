import { Topic } from '@app/common/models/Course';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface TopicQuizProps {
  topic: Topic | null;
}

const TopicQuiz: React.FC<TopicQuizProps> = ({ topic }) => {
  if (!topic) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Typography variant="h6">{topic.title}</Typography>
    </>
  );
};

export default TopicQuiz;
