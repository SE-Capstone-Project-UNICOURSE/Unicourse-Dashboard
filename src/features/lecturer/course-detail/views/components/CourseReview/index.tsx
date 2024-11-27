import { Course } from '@app/common/models/Course';
import { Box, Card, CardContent, CardMedia, Rating, Stack, Typography } from '@mui/material';
import { labels } from '../../../constants';
import React from 'react';
import StatusChip from '../../../../../../common/components/Chip';

interface CourseReviewProps {
  loading: boolean;
  courseDetail: Course | undefined;
}

const CourseReview: React.FC<CourseReviewProps> = ({ loading, courseDetail }) => {
  if (loading || !courseDetail) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Card sx={{ display: 'flex', minHeight: '10rem' }}>
        <CardMedia
          component="img"
          sx={{ minWidth: '15rem', width: '15rem', objectFit: 'fill' }}
          image={courseDetail.thumbnail}
          alt={courseDetail.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Stack spacing={1}>
              <Typography component="div" variant="h5">
                {courseDetail.lecturer?.user?.full_name}
              </Typography>
              <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
                Tổng số học viên: {courseDetail.students_enrolled || 0}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
                  Đánh giá:
                </Typography>
                <Rating size="small" name="read-only" value={courseDetail.rating} readOnly />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
                  Trạng thái:
                </Typography>
                <StatusChip
                  value={courseDetail.status}
                  size="small"
                  label={labels}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default CourseReview;
