import { ChevronLeft } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import type { Breakpoint } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { varAlpha } from '@theme/styles';
import type { NavLecturerContentProps } from '../../types';
import NavContent from './NavLecturerContent';

import { GridMenuIcon } from '@mui/x-data-grid';
import React from 'react';

type NavLectureDesktop = {
  layoutQuery: Breakpoint;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavLecturerDesktop = ({
  sx,
  data,
  slots,
  layoutQuery,
  setIsCollapsed,
  isCollapsed,
}: NavLecturerContentProps & NavLectureDesktop) => {
  const theme = useTheme();

  const toggleNav = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: isCollapsed ? '64px' : 'var(--layout-nav-vertical-width)', // Adjusted width for collapsed state
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(
          theme.vars.palette.grey['500Channel'],
          0.12
        )})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        transition: 'width 0.3s', // Smooth transition for collapse/expand
        ...sx,
      }}
    >
      {/* Toggle button for collapsing/expanding navigation */}
      <IconButton
        onClick={toggleNav}
        sx={{
          alignSelf: isCollapsed ? 'center' : 'flex-end',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
          color: 'text.primary',
        }}
      >
        {isCollapsed ? <GridMenuIcon /> : <ChevronLeft />}
      </IconButton>

      <NavContent data={data} slots={slots} isCollapsed={isCollapsed} />
    </Box>
  );
};

export default NavLecturerDesktop;
