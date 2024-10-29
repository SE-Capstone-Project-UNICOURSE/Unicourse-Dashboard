import useRouter from '@app/routes/hooks/useRouter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type LecturerCourseItemProps = {};

// Adjusted item props to receive the necessary course data
const LecturerCourseItem = () => {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
      <Box display="flex" alignItems="center" gap={2}>
        {/* Course Information */}
        <img
          src="https://via.placeholder.com/40"
          alt="Course"
          style={{ width: 40, height: 40, borderRadius: '50%' }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            price
          </Typography>
        </Box>
      </Box>

      {/* Revenue and Sold Info */}
      <Box textAlign="right">
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Revenue
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bán đượcØ
        </Typography>
      </Box>
    </Box>
  );
};

export default LecturerCourseItem;
