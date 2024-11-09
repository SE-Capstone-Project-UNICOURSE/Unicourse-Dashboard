import { Topic } from '@app/common/models/Course';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface TopicDocumentProps {
  topic: Topic | null;
}

const TopicDocument: React.FC<TopicDocumentProps> = ({ topic }) => {
  if (!topic) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Typography variant="h6">{topic.title}</Typography>
    </>
  );
};

export default TopicDocument;
