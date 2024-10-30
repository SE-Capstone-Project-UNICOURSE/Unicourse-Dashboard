import type { NavContentProps } from '@app/features/admin/dashboard/types';
import usePathname from '@app/routes/hooks/usePathname';
import { Drawer, drawerClasses } from '@mui/material';
import { useEffect } from 'react';
import NavContent from './NavLecturerContent';

const NavLecturerMobile = ({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [pathname]);

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
          width: 'var(--layout-nav-mobile-width)',
          transition: 'width 0.3s ease-in-out',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
};

export default NavLecturerMobile;
