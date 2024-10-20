// ----------------------------------------------------------------------

import { layoutClasses } from '@app/features/dashboard/layouts/classes';
import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, useTheme } from '@mui/material';

type MainProps = BoxProps & {
  layoutQuery: Breakpoint;
};

const AuthMain = ({ sx, children, layoutQuery, ...other }: MainProps) => {
  const theme = useTheme();

  const renderContent = (
    <Box
      sx={{
        py: 5,
        px: 3,
        width: 1,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        maxWidth: 'var(--layout-auth-content-width)',
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexDirection: 'column',
        p: theme.spacing(3, 2, 10, 2),
        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: 'center',
          p: theme.spacing(10, 0, 10, 0),
        },
        ...sx,
      }}
      {...other}
    >
      {renderContent}
    </Box>
  );
};

export default AuthMain;
