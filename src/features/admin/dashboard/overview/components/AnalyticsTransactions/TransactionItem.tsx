import type { BoxProps } from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import { fToNow } from 'src/utils/format-time';

// Define the type for individual post items
type PostItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  postedAt: Date | string;
  price: number; // Giá tiền
};

type Props = BoxProps & {
  item: PostItemProps;
};

 // Hàm format tiền tệ
 const formatPrice = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

// TransactionItem component responsible for rendering individual transactions
export default function TransactionItem({ sx, item, ...other }: Props) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      {/* Avatar */}
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      {/* Title and description */}
      <ListItemText
        primary={item.title}
        secondary={`${item.description}`}
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: 'span' }}
      />

      {/* Giá tiền */}
      <Box sx={{ flexShrink: 0, typography: 'subtitle2', color: 'primary.main', textAlign: 'right' }}>
        {formatPrice(item.price)}
      </Box>

      {/* Thời gian */}
      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(item.postedAt)}
      </Box>
    </Box>
  );
}
