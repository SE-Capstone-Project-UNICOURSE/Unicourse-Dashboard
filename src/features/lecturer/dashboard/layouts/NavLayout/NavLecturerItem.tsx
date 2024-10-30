import RouterLink from '@app/routes/components/RouterLink';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, Typography } from '@mui/material';
import type { NavItemLecturerProps } from '../../types';

type RenderNavItemLecturerProps = {
  item: NavItemLecturerProps;
  isActive: boolean;
  openItem: string | null;
  handleToggle: (title: string) => void;
  pathname: string;
  isCollapsed?: boolean;
};

const RenderNavItemLecturer = ({
  item,
  openItem,
  isActive,
  handleToggle,
  pathname,
  isCollapsed,
}: RenderNavItemLecturerProps) => {
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openItem === item.title;

  return (
    <Box width="100%">
      <ListItemButton
        disableGutters
        component={!hasChildren && item.path ? RouterLink : 'div'}
        {...(!hasChildren && item.path && { href: item.path })}
        sx={{
          pl: isCollapsed ? 1 : 2,
          py: 1.5,
          gap: isCollapsed ? 0 : 2,
          pr: 1.5,
          borderRadius: 0.75,
          typography: 'body2',
          fontWeight: isActive ? 'fontWeightBold' : 'fontWeightMedium',
          color: isActive ? 'primary.main' : 'text.secondary',
          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
          justifyContent: isCollapsed ? 'center' : 'flex-start', // Center items in collapsed state
        }}
        onClick={() => hasChildren && handleToggle(item.title)}
      >
        {/* Icon */}
        <Box component="span" sx={{ width: 24, height: 24 }}>
          {item.icon}
        </Box>

        {/* Title - Only show if not collapsed */}
        {!isCollapsed && (
          <Box component="span" flexGrow={1}>
            <Typography variant="subtitle2" fontWeight={isActive ? 'bold' : 'medium'}>
              {item.title}
            </Typography>
          </Box>
        )}

        {/* Expand/Collapse Icon - Only show if not collapsed */}
        {hasChildren && !isCollapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}

        {/* Optional Info */}
        {item.info && !isCollapsed && item.info}
      </ListItemButton>

      {/* Render children if the item has children and is expanded */}
      {hasChildren && !isCollapsed && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child) => {
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
                      backgroundColor: childIsActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      },
                    }}
                  >
                    {/* Child Icon */}
                    <Box component="span" sx={{ width: 24, height: 24 }}>
                      {child.icon}
                    </Box>

                    {/* Child Title */}
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

export default RenderNavItemLecturer;
