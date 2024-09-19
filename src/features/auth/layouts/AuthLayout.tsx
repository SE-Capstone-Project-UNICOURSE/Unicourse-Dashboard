import LayoutSection from '@app/features/dashboard/layouts/core/LayoutSection';
import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';
import { stylesMode } from '@theme/styles';
import { AuthMain } from './AuthMain';

// ----------------------------------------------------------------------

export type AuthLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

const AuthLayout = ({ sx, children, header }: AuthLayoutProps) => {
  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={{
        '&::before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(/assets/background/overlay.jpg)`,
          [stylesMode.dark]: { opacity: 0.08 },
        },
        ...sx,
      }}
    >
      <AuthMain layoutQuery={layoutQuery}>{children}</AuthMain>
    </LayoutSection>
  );
};

export default AuthLayout;
