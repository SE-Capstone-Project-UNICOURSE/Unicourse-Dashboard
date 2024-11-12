import { useAppSelector } from '@app/stores';
import helpers from '@app/utils/helpers';
import { BadgeOutlined, LibraryBooks, People, School } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

const LectureInfoOverall = () => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);
  const {
    lectureInfo: { info },
  } = useAppSelector((state) => state.dashboardLecture);

  return (
    <Card>
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            alt={userInfo?.full_name}
            src={userInfo?.profile_image}
            sx={{ width: 56, height: 56 }}
          />
        }
        title={userInfo?.full_name}
        subheader={userInfo?.title || 'Lecturer'}
      />

      <CardContent>
        {/* Total Courses and Enrollments */}
        <Typography variant="h6" gutterBottom>
          Thống kê
        </Typography>
        <Box display="flex" justifyContent="space-around" sx={{ mb: 2 }}>
          <Box textAlign="center">
            <School color="primary" />
            <Typography variant="h6">{info?.total_courses || 0}</Typography>
            <Typography variant="body2" color="textSecondary">
              Tổng số khoá học
            </Typography>
          </Box>
          <Box textAlign="center">
            <People color="primary" />
            <Typography variant="h6">{info?.total_enrollments || 0}</Typography>
            <Typography variant="body2" color="textSecondary">
              Tổng số đăng ký
            </Typography>
          </Box>
          <Box textAlign="center">
            <LibraryBooks color="primary" />
            <Typography variant="h6">{info?.course.length || 0}</Typography>
            <Typography variant="body2" color="textSecondary">
              Tổng khoá học
            </Typography>
          </Box>
        </Box>

        {/* Basic Information */}
        <Typography variant="h6" gutterBottom>
          Giới thiệu
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {info?.info_description || 'Thông tin giảng viên chưa được cập nhật.'}
        </Typography>

        {/* Skills */}
        <Typography variant="h6" gutterBottom>
          Kỹ năng
        </Typography>
        <List>
          {info?.skill_json?.skills.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${skill.name} - ${skill.level}`} />
            </ListItem>
          ))}
        </List>

        {/* Certifications */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Chứng chỉ
        </Typography>
        <List>
          {info?.skill_json?.certifications.map((certification, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <BadgeOutlined color="success" />
              </ListItemIcon>
              <ListItemText primary={`${certification.name} (${certification.year})`} />
            </ListItem>
          ))}
        </List>

        {/* Certificates (with images) */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Khoá học gần nhất
        </Typography>
        <Box display="flex" flexWrap="wrap">
          <Grid container spacing={2}>
            {info?.course.slice(-6).map((course, index) => (
              <Grid item xs={6} sm={6} md={6} key={index}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    boxShadow: 1,
                    height: 210,
                  }}
                >
                  <Avatar
                    alt={course.title}
                    src={course.thumbnail}
                    variant="rounded"
                    sx={{ width: '100%', height: 130 }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography variant="caption" color="ActiveBorder" sx={{ textAlign: 'center' }}>
                    Giá:{' '}
                    {course.price > 0
                      ? `${helpers.formatCurrencyVND(course.price)} VND`
                      : 'Miễn phí'}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ textAlign: 'center', mt: 1 }}
                  >
                    Số lượng đăng ký: {course.students_enrolled}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LectureInfoOverall;
