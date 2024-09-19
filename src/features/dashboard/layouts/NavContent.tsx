import usePathname from '@app/routes/hooks/usePathname';
import { Logo } from '@components/logo';
import { Scrollbar } from '@components/scrollbar';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { RouterLink } from '@routes/components';
import { useState } from 'react';
import DashboardUI from '../components';
import type { NavContentProps, NavItem } from '../types';

const NavContent = ({ data, slots, sx }: NavContentProps) => {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null); // Only one open item at a time

  const handleToggle = (title: string) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setOpenItem((prev) => (prev === title ? null : title));
  };

  const renderNavItem = (item: NavItem, isActived: boolean) => {
    const hasChildren = Boolean(item.children?.length); // Kiểm tra nếu có children và không rỗng
    const hasPath = Boolean(item.path); // Kiểm tra nếu có path
    const isOpen = openItem === item.title; // Kiểm tra nếu item đang mở

    return (
      <Box width={'100%'}>
        <ListItemButton
          disableGutters
          component={!hasChildren && hasPath ? RouterLink : 'div'} // Nếu không có children thì component là RouterLink để điều hướng
          {...(!hasChildren && hasPath && { href: item.path })} // Chỉ thêm href nếu item không có children
          sx={{
            pl: 2,
            py: 1.5,
            gap: 2,
            pr: 1.5,
            borderRadius: 0.75,
            typography: 'body2',
            fontWeight: isActived ? 'fontWeightBold' : 'fontWeightMedium',
            color: isActived ? 'primary.main' : 'text.secondary',
            backgroundColor: isActived ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            },
          }}
          onClick={() => hasChildren && handleToggle(item.title)} // Chỉ gọi handleToggle nếu item có children
        >
          <Box component="span" sx={{ width: 24, height: 24 }}>
            {item.icon}
          </Box>
          <Box component="span" flexGrow={1}>
            <Typography variant="subtitle2" fontWeight={isActived ? 'bold' : 'medium'}>
              {item.title}
            </Typography>
          </Box>
          {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}{' '}
          {/* Hiển thị icon Expand nếu có children */}
          {item.info && item.info}
        </ListItemButton>

        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => {
                // Sử dụng optional chaining để tránh lỗi
                const childIsActive = child.path === pathname;
                return (
                  <ListItem disableGutters disablePadding key={child.title}>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={child.path ?? ''}
                      sx={{
                        pl: 2,
                        py: 0.5,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightRegular',
                        color: childIsActive ? 'primary.main' : 'text.secondary',
                        backgroundColor: childIsActive
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        },
                      }}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>
                        {child.icon}
                      </Box>
                      <Box component="span" flexGrow={1}>
                        <Typography variant="body2" fontWeight={childIsActive ? 'bold' : 'regular'}>
                          {child.title}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </Box>
    );
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
                  {renderNavItem(item, isActived)}
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
