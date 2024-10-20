import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { layoutClasses } from '../classes';

const DashboardLecturerMain = ({ children, sx, ...other }: BoxProps) => (
  <Box
    component="main"
    className={layoutClasses.main}
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      ...sx,
    }}
    {...other}
  >
    {children}
  </Box>
);

export default DashboardLecturerMain;
