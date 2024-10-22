import useRouter from '@app/routes/hooks/useRouter';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fDateTime } from 'src/utils/format-time';

// Hardcoded data
const item = {
  id: '1',
  type: 'order1',
  title: 'UI/UX Design with Adobe XD',
  time: '2024-10-22T12:00:00Z',
  imageUrl: 'https://via.placeholder.com/40', // Add an image URL here
};

// Item component for the timeline
const LecturerTransactionsItem = () => {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center" sx={{ py: 1 }}>
      {/* Image from URL */}
      <img
        src={item.imageUrl}
        alt={item.title}
        style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }}
      />

      {/* Text Content */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          {item.title}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(item.time)}
        </Typography>
      </Box>
    </Box>
  );
};

export default LecturerTransactionsItem;
