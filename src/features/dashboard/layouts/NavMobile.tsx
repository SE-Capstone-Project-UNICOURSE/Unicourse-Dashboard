import usePathname from '@app/routes/hooks/usePathname';
import { Drawer, drawerClasses } from '@mui/material';
import { useEffect } from 'react';
import { NavContentProps } from '../types';
import NavContent from './NavContent';

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose(); // Close drawer on navigation change
    }
  }, [pathname, open, onClose]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)', // Adjust to ensure correct width on mobile
          transition: 'width 0.3s ease-in-out', // Smooth transition for opening/closing
          ...sx,
        },
      }}
    >
      {/* Pass data to NavContent */}
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}
