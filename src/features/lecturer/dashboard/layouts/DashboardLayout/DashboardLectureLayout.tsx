import Iconify from '@app/common/components/iconify/Iconify';
import navData from '@app/routes/navbar/navbar-lecturer-config';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import DashboardUI from '../../components';
import { Main } from '../../simple';
import type { DashboardLecturerLayoutProps } from '../../types/LayoutNavLecturerContentTypes';
import { _langs, _notifications } from '../_mockData';
import { layoutClasses } from '../classes';
import HeaderSection from '../core/HeaderLecturerSection';
import LayoutSection from '../core/LayoutLecturerSection';
import NavDesktop from '../NavLayout/NavLecturerDesktop';
import NavLecturerMobile from '../NavLayout/NavMobile';

const DashboardLectureLayout = ({ sx, children, header }: DashboardLecturerLayoutProps) => {
  const theme = useTheme();
  const [navOpen, setNavOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
                  onClick={() => setNavOpen(!navOpen)} // Toggle navOpen state
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />

                <NavLecturerMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                />
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
                      label: 'Trang chủ',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Hồ sơ',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Cài đặt',
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
      sidebarSection={
        <NavDesktop
          data={navData}
          layoutQuery={layoutQuery}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      }
      footerSection={null}
      cssVars={{
        '--layout-nav-vertical-width': `${isCollapsed ? '0px' : '300px'}`,
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
      <Main sx={{ transition: 'margin-left 0.3s ease' }} openNav={navOpen}>
        {children}
      </Main>
    </LayoutSection>
  );
};

export default DashboardLectureLayout;
