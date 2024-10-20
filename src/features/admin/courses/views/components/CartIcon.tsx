import Iconify from '@app/common/components/iconify/Iconify';
import RouterLink from '@app/routes/components/RouterLink';
import Badge from '@mui/material/Badge';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  totalItems: number;
};

const CartIcon = ({ totalItems, sx, ...other }: Props) => (
  <Box
    component={RouterLink}
    href="#"
    sx={{
      right: 0,
      top: 112,
      zIndex: 999,
      display: 'flex',
      cursor: 'pointer',
      position: 'fixed',
      color: 'text.primary',
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      bgcolor: 'background.paper',
      padding: (theme) => theme.spacing(1, 3, 1, 2),
      boxShadow: (theme) => theme.customShadows.dropdown,
      transition: (theme) => theme.transitions.create(['opacity']),
      '&:hover': { opacity: 0.72 },
      ...sx,
    }}
    {...other}
  >
    <Badge showZero badgeContent={totalItems} color="error" max={99}>
      <Iconify icon="solar:cart-3-bold" width={24} />
    </Badge>
  </Box>
);

export default CartIcon;