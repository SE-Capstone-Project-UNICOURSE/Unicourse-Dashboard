import useRouter from '@app/routes/hooks/useRouter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type LecturerCourseItemProps = {
  title: string;
  price: number;
  sold: number;
  revenue: number;
  category: string;
};

// Adjusted item props to receive the necessary course data
const LecturerCourseItem = ({ title, price, sold, revenue, category }: LecturerCourseItemProps) => {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
      <Box display="flex" alignItems="center">
        {/* Category Badge */}
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: 'lightgreen',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            mr: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {category}
          </Typography>
        </Box>

        {/* Course Information */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${price.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {/* Revenue and Sold Info */}
      <Box textAlign="right">
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          ${revenue.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sold} Sold
        </Typography>
      </Box>
    </Box>
  );
};

export default LecturerCourseItem;
