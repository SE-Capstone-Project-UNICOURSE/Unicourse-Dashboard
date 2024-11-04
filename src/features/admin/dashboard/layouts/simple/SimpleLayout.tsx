import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import RouterLink from '@app/routes/components/RouterLink';
import HeaderSection from '../core/HeaderSection';
import LayoutSection from '../core/LayoutSection';
import { CompactContent } from './CompactContent';
import { Main } from './Main';
import { Box } from '@mui/material';

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  content?: {
    compact?: boolean;
  };
};

const SimpleLayout = ({ sx, children, header, content }: SimpleLayoutProps) => {
  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            rightArea: (
              <Box justifyContent={'center'}>
                <Link
                  href="#"
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-simple-content-compact-width': '448px',
      }}
      sx={sx}
    >
      <Main>
        {content?.compact ? (
          <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
        ) : (
          children
        )}
      </Main>
    </LayoutSection>
  );
};

export default SimpleLayout;
