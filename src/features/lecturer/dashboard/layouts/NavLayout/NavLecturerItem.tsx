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
};

const RenderNavItemLecturer = ({
  item,
  openItem,
  isActive,
  handleToggle,
  pathname,
}: RenderNavItemLecturerProps) => {
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
          fontWeight: isActive ? 'fontWeightBold' : 'fontWeightMedium',
          color: isActive ? 'primary.main' : 'text.secondary',
          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
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
          <Typography variant="subtitle2" fontWeight={isActive ? 'bold' : 'medium'}>
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
                      backgroundColor: childIsActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
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

export default RenderNavItemLecturer;
