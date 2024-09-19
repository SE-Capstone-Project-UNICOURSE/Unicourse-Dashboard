import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import SettingView from './views/SettingView';

// ----------------------------------------------------------------------

export default function CoursePages() {
  return (
    <>
      <Helmet>
        <title> {`Settings - ${CONFIG.appName}`}</title>
      </Helmet>

      <SettingView />
    </>
  );
}
