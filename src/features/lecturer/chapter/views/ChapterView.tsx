import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText, Divider, Button, Stack, Paper } from '@mui/material';

// Example fake data
const courseData = {
  chapter: [
    {
      id: 311,
      title: "Spring Boot Buổi 1: Làm quen với Http và RestAPI",
      position: 1,
      created_at: "2024-09-18T05:39:21.487Z",
      updated_at: "2024-09-18T05:39:21.487Z",
      status: "PUBLISHED",
      course_id: 17,
      topic: [
        {
          id: 299,
          title: "Http và RestAPI",
          description: "Spring Boot Course description",
          position: 1,
          element_topic: {
            video: {
              id: 321,
              url: "1010527100",
              platform: "VIMEO",
            },
            document: {
              text: "Thông báo buổi học ôn môn SWR302 của thầy Nguyễn Văn Tự Cường",
              content: "<p>Thông tin buổi học ôn môn SWR302...</p>",
            },
          },
        },
        {
          id: 300,
          title: "Tài liệu",
          description: "Tham khảo tài liệu",
          position: 2,
          element_topic: {
            document: {
              text: "Tài liệu SpringBoot buổi 2",
              content: "<p>API là gì? Trước khi...</p>",
            },
          },
        },
        {
          id: 301,
          title: "Ôn tập trắc nghiệm",
          description: "Câu hỏi ôn tập buổi học Http và RestAPI",
          position: 3,
          element_topic: {
            question_bank: {
              id: 6,
              title: "Câu hỏi ôn tập Http và RestAPI",
              total_question: 10,
              duration: 30,
            },
          },
        },
      ],
    },
  ],
};

const ChapterDetailPage: React.FC = () => {
  // Get params from the URL
  const { id, chapterId } = useParams<{ id: string, chapterId: string }>();

  const [chapter, setChapter] = useState<any | null>(null);

  // Find the course chapter by chapterId
  useEffect(() => {
    // Simulating fetching course data based on `id` and `chapterId`
    const selectedChapter = courseData.chapter.find((ch) => ch.id.toString() === chapterId);
    setChapter(selectedChapter || null);
  }, [chapterId]);

  if (!chapter) {
    return <Box>Chapter not found</Box>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">{chapter.title}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Mô tả: {chapter.status} - Vị trí: {chapter.position}
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6">Danh sách bài học:</Typography>
      <List>
        {chapter.topic.map((topic, index) => (
          <ListItem key={index}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1">{topic.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {topic.description}
              </Typography>

              <Box sx={{ marginTop: 1 }}>
                {/* Conditionally render different elements depending on the type of content */}
                {topic.element_topic.video && (
                  <Paper sx={{ padding: 2, marginTop: 2 }} variant="outlined">
                    <Typography variant="h6">Video:</Typography>
                    <Typography>
                      <a
                        href={`https://vimeo.com/${topic.element_topic.video.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem Video - Vimeo ID: {topic.element_topic.video.id}
                      </a>
                    </Typography>
                  </Paper>
                )}

                {topic.element_topic.document && (
                  <Paper sx={{ padding: 2, marginTop: 2 }} variant="outlined">
                    <Typography variant="h6">Tài liệu:</Typography>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: topic.element_topic.document.content,
                      }}
                    />
                  </Paper>
                )}

                {topic.element_topic.question_bank && (
                  <Paper sx={{ padding: 2, marginTop: 2 }} variant="outlined">
                    <Typography variant="h6">Ôn tập:</Typography>
                    <Typography>{topic.element_topic.question_bank.title}</Typography>
                    <Typography>
                      Tổng số câu hỏi: {topic.element_topic.question_bank.total_question} - Thời gian làm bài:{' '}
                      {topic.element_topic.question_bank.duration} phút
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>

      <Stack direction="row" justifyContent="flex-start" spacing={2} mt={2}>
        <Button variant="contained" color="primary">
          Thêm chương mục
        </Button>
      </Stack>
    </Box>
  );
};

export default ChapterDetailPage;