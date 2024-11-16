import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TransactionItem from './TransactionItem';
import { Scrollbar } from '@app/common/components/scrollbar';
import Iconify from '@app/common/components/iconify/Iconify';

// Define the type for the post items and AnalyticsNews props
type PostItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  postedAt: Date | string;
  price: number; // Giá tiền của giao dịch
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: PostItemProps[];
};

// Component AnalyticsTransactions hiển thị danh sách các giao dịch gần đây
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
          Xem tất cả
        </Button>
      </Box>
    </Card>
  );
}
