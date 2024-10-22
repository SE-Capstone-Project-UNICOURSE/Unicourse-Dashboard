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
};

type Props = BoxProps & {
  item: PostItemProps;
};

// PostItem component responsible for rendering individual news posts
export default function NewsPostItem({ sx, item, ...other }: Props) {
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
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={item.title}
        secondary={item.description}
        primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: 'span' }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(item.postedAt)}
      </Box>
    </Box>
  );
}
