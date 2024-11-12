import { Topic } from '@app/common/models/Course';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface TopicDocumentProps {
  topic: Topic | null;
}

const TopicDocument: React.FC<TopicDocumentProps> = ({ topic }) => {
  if (!topic || !topic.element_topic.document) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Typography variant="body1" component="div">
        { topic.element_topic.document.content.length === 0 ? (
          <Typography sx={{ paddingY: '0.5rem' }} variant="body1" component="div">
            Không có mô tả
          </Typography>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: topic.element_topic.document.content }} />
        )}
      </Typography>
    </Box>
  );
};

export default TopicDocument;
