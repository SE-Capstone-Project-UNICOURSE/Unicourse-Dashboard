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
    const hasPath = Boolean(item.path); // Ensure path exists
    const isOpen = openItem === item.title; // Check if this item is currently open

    return (
      <Box display="flex" flexDirection={'column'} width={'100%'}>
        <ListItemButton
          disableGutters
          component={hasPath ? RouterLink : 'div'} // Only use RouterLink if the path exists
          {...(hasPath && { href: item.path })} // Safely pass href only if the path exists
          sx={{
            pl: 2,
            py: 1.5,
            gap: 2,
            pr: 1.5,
            borderRadius: 0.75,
            typography: 'body2',
            fontWeight: isActived ? 'fontWeightBold' : 'fontWeightMedium', // Active color
            color: isActived ? 'primary.main' : 'text.secondary',
            backgroundColor: isActived ? 'rgba(255, 255, 255, 0.08)' : 'transparent', // Highlight active background
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)', // Light hover effect
            },
          }}
          onClick={() => item.children && handleToggle(item.title)} // Handle toggle for submenus
        >
          <Box component="span" sx={{ width: 24, height: 24 }}>
            {item.icon}
          </Box>
          <Box component="span" flexGrow={1}>
            <Typography variant="subtitle2" fontWeight={isActived ? 'bold' : 'medium'}>
              {item.title}
            </Typography>
          </Box>
          {item.children && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          {item.info && item.info}
        </ListItemButton>

        {item.children && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => {
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
                          backgroundColor: 'rgba(255, 255, 255, 0.04)', // Light hover effect for child items
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
          {' '}
          {/* Use flexDirection column */}
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {' '}
            {/* Flex column layout */}
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
