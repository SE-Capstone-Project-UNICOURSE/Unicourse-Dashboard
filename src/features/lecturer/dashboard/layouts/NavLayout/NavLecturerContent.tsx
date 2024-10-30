import { Logo } from '@app/common/components/logo';
import { Scrollbar } from '@app/common/components/scrollbar';
import usePathname from '@app/routes/hooks/usePathname';
import { Box, ListItem } from '@mui/material';
import { useState } from 'react';
import type { NavLecturerContentProps } from '../../types';
import RenderNavItem from './NavLecturerItem';

const NavLecturerContent = ({
  data,
  slots,
  sx,
  isCollapsed,
}: NavLecturerContentProps & { isCollapsed?: boolean }) => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenItem((prev) => (prev === title ? null : title));
  };

  return (
    <Box width={'100%'}>
      <Box display="flex" justifyContent="center" alignItems="center" py={2}>
        {/* Only show logo if nav is expanded */}
        {!isCollapsed && <Logo />}
      </Box>

      <Scrollbar fillContent>
        <Box component="nav" display="flex" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const isActive = item.path === pathname;
              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  {RenderNavItem({ item, isActive, openItem, handleToggle, pathname, isCollapsed })}
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </Box>
  );
};

export default NavLecturerContent;
