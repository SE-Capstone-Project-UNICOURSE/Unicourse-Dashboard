import { useAppSelector } from '@app/stores';
import { Bookmark, People } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const CourseDetailInfoCreate = () => {
  const {
    selectedCourseDetail: { data: courseDetail, isLoading },
  } = useAppSelector((state) => state.listCourseOfflineLecture);

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
          <CircularProgress />
        </Box>
      ) : courseDetail ? (
        <Box>
          <Box
            position="relative"
            sx={{
              backgroundImage: `url(${courseDetail.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
              borderRadius: '20px',
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
              }}
            >
              <Bookmark fontSize="large" />
            </IconButton>
          </Box>

          <Box p={1}>
            <Box mt={1}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {courseDetail.title}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={2}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {courseDetail.price} VND
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={0.5}>
                  <People fontSize="small" />
                  <Typography variant="body2">{courseDetail.students_enrolled} Học viên</Typography>
                </Box>

                <Box>
                  <Chip label="Chứng chỉ" icon={<Bookmark />} size="small" />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Giới thiệu khóa học
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {courseDetail.title_description}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              paragraph
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? courseDetail.description
                  : `${courseDetail.description.slice(0, 200)}...`,
              }}
            />
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowFullDescription((prev) => !prev)}
            >
              {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Không có dữ liệu khóa học
        </Typography>
      )}
    </Box>
  );
};

export default CourseDetailInfoCreate;
