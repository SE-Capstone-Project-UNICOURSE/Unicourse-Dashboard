import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, useTheme } from '@mui/material';
import { layoutClasses } from '../layouts/classes';

// ----------------------------------------------------------------------

const CompactContent = ({
  sx,
  layoutQuery,
  children,
  ...other
}: BoxProps & { layoutQuery: Breakpoint }) => {
  const theme = useTheme();

  return (
    <Box
      className={layoutClasses.content}
      sx={{
        width: 1,
        mx: 'auto',
        display: 'flex',
        flex: '1 1 auto',
        textAlign: 'center',
        flexDirection: 'column',
        p: theme.spacing(3, 2, 10, 2),
        maxWidth: 'var(--layout-simple-content-compact-width)',
        [theme.breakpoints.up(layoutQuery)]: {
          justifyContent: 'center',
          p: theme.spacing(10, 0, 10, 0),
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default CompactContent;
