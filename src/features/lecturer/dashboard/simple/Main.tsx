import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { layoutClasses } from '../layouts/classes';

type MainProps = BoxProps & { openNav?: boolean };

export function Main({ children, sx, openNav = true, ...other }: MainProps) {
  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        marginLeft: openNav ? 'var(--layout-nav-vertical-width)' : '0', // Adjust left margin based on openNav
        width: openNav ? 'calc(100% - var(--layout-nav-vertical-width))' : '100%', // Full width if openNav is false
        transition: 'margin-left 0.3s ease, width 0.3s ease',
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
