import type { Breakpoint, ContainerProps } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { layoutClasses } from '../classes';

type DashboardLectureContentProps = ContainerProps & {
  disablePadding?: boolean;
};

const DashboardLectureContent = ({
  sx,
  children,
  disablePadding,
  maxWidth = 'xl',
  ...other
}: DashboardLectureContentProps) => {
  const theme = useTheme();
  const layoutQuery: Breakpoint = 'lg';

  return (
    <Container
      className={layoutClasses.content}
      maxWidth={maxWidth || false}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        pt: 'var(--layout-dashboard-content-pt)',
        pb: 'var(--layout-dashboard-content-pb)',
        ...(disablePadding
          ? { p: 0 } // Remove padding if disablePadding is true
          : {
              [theme.breakpoints.up(layoutQuery)]: {
                px: 'var(--layout-dashboard-content-px)',
              },
            }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Container>
  );
};

export default DashboardLectureContent;
