import Iconify from '@app/components/iconify/Iconify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Scrollbar } from 'src/components/scrollbar';
import TransactionItem from './TransactionItem';

// Define the type for the post items and AnalyticsNews props
type PostItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  postedAt: Date | string;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: PostItemProps[];
};

// AnalyticsNews component responsible for rendering a list of news posts
export default function AnalyticsTransactions({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 405 }}>
        <Box sx={{ minWidth: 640 }}>
          {list.map((post) => (
            <TransactionItem key={post.id} item={post} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
