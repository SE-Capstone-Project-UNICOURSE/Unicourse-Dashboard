import Iconify from '@app/components/iconify/Iconify';
import { layoutClasses } from '@app/features/dashboard/layouts/classes';
import { Main } from '@app/features/dashboard/layouts/simple';
import navData from '@app/routes/navbar/navbar-config';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { _langs, _notifications } from '../../_mockData';
import DashboardUI from '../../components';
import type { DashboardLayoutProps } from '../../types/LayoutNavContentTypes';
import NavDesktop from '../NavLayout/NavDesktop';
import NavMobile from '../NavLayout/NavMobile';
import HeaderSection from '../core/HeaderSection';
import LayoutSection from '../core/LayoutSection';

const DashboardLayout = ({ sx, children, header }: DashboardLayoutProps) => {
  const theme = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const layoutQuery: Breakpoint = 'lg';

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <DashboardUI.MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile data={navData} open={navOpen} onClose={() => setNavOpen(false)} />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <DashboardUI.Searchbar />
                <DashboardUI.LanguagePopover data={_langs} />
                <DashboardUI.NotificationsPopover data={_notifications} />
                <DashboardUI.AccountPopover
                  data={[
                    {
                      label: 'Home',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Profile',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Settings',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={<NavDesktop data={navData} layoutQuery={layoutQuery} />}
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
};

export default DashboardLayout;
