import { Topic } from '@app/common/models/Course';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import TopicIcon from '@mui/icons-material/Topic';
import QuizIcon from '@mui/icons-material/Quiz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useRef, useState } from 'react';
import { TOPIC_TYPE } from './core/constants';
import TopicVideo from './components/TopicVideo';
import TopicDocument from './components/TopicDocument';
import TopicQuiz from './components/TopicQuiz';

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
  // Dialog Variables
  const [open, setOpen] = useState(false);
  const [topicType, setTopicType] = useState<Array<string | null>>([]);
  const [selectTopic, setSelectTopic] = useState<Topic | null>(null);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll'], item: Topic) => () => {
    const arrayTopicType: Array<string | null> = [];
    if (item.element_topic.video_id) {
      arrayTopicType.push(TOPIC_TYPE.VIDEO);
    }

    if (item.element_topic.question_bank_id) {
      arrayTopicType.push(TOPIC_TYPE.QUIZ);
    }

    if (item.element_topic.document_id) {
      arrayTopicType.push(TOPIC_TYPE.DOCUMENT);
    }

    setTopicType(arrayTopicType);
    setSelectTopic(item);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
                <Button
                  onClick={handleClickOpen('paper', item)}
                  size="small"
                  variant="text"
                  startIcon={<VisibilityIcon />}
                >
                  Xem chi tiết
                </Button>
              </Grid>
            </Grid>
            {index !== topics.length - 1 && <Divider sx={{ paddingBottom: 2 }} />}
          </Item>
        ))}
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{selectTopic?.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText>
            {topicType.includes(TOPIC_TYPE.VIDEO) && <TopicVideo topic={selectTopic} />}
            {topicType.includes(TOPIC_TYPE.DOCUMENT) && <TopicDocument topic={selectTopic} />}
            {topicType.includes(TOPIC_TYPE.QUIZ) && <TopicQuiz topic={selectTopic} />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListTopic;
