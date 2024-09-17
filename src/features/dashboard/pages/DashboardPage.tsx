import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import { OverviewAnalyticsView } from '../../overview';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
