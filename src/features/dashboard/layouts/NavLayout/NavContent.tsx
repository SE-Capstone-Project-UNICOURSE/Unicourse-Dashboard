import usePathname from '@app/routes/hooks/usePathname';
import { Logo } from '@app/common/components/logo';
import { Scrollbar } from '@app/common/components/scrollbar';
import { Box, ListItem } from '@mui/material';
import { useState } from 'react';
import DashboardUI from '../../components';
import type { NavContentProps } from '../../types';
import RenderNavItem from './NavItem';

const NavContent = ({ data, slots, sx }: NavContentProps) => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null); // Only one open item at a time

  const handleToggle = (title: string) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setOpenItem((prev) => (prev === title ? null : title));
  };

  return (
    <Box width={'100%'}>
      <Box display="flex" justifyContent="center" alignItems="center" py={2}>
        <Logo />
      </Box>

      {slots?.topArea}
      <DashboardUI.WorkspacesPopover sx={{ my: 2 }} />

      <Scrollbar fillContent>
        <Box component="nav" display="flex" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const isActived = item.path === pathname;
              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  {RenderNavItem({ item, isActived, openItem, handleToggle, pathname })}
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

export default NavContent;
