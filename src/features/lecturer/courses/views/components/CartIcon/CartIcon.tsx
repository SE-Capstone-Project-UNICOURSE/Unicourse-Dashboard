// File Component: CartLecturerIcon.tsx

import Iconify from '@app/common/components/iconify/Iconify';
import RouterLink from '@app/routes/components/RouterLink';
import Badge from '@mui/material/Badge';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import './CartIcon.scss'; // Import file SCSS

// ----------------------------------------------------------------------

type Props = BoxProps & {
  totalItems: number;
};

const CartLecturerIcon = ({ totalItems, sx, ...other }: Props) => (
  <Box
    component={RouterLink}
    href="#"
    className="cartLecturerIcon"
    sx={{ ...sx }}
    {...other}
  >
    <Badge showZero badgeContent={totalItems} color="error" max={99}>
      <Iconify icon="solar:cart-3-bold" width={24} />
    </Badge>
  </Box>
);

export default CartLecturerIcon;