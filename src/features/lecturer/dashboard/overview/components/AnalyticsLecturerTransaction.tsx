import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import LecturerTransactionsItem from './LecturerTransactionsItem'; // Import the Item component
import { Divider, Stack } from '@mui/material';

// Define the type for the order timeline props
type AnalyticsLecturerTransactionProps = CardProps & {
  title?: string;
  subheader?: string;
};

// AnalyticsOrderTimeline component that renders the entire timeline
const AnalyticsLecturerTransaction = ({
  title,
  subheader,
  ...other
}: AnalyticsLecturerTransactionProps) => (
  <Card {...other}>
    <CardHeader style={{ paddingBottom: 20 }} title={title} subheader={subheader} />

    <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} px={2}>
      <LecturerTransactionsItem />
    </Stack>
    <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} px={2}>
      <LecturerTransactionsItem />
    </Stack>
    <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} px={2}>
      <LecturerTransactionsItem />
    </Stack>
  </Card>
);

export default AnalyticsLecturerTransaction;
