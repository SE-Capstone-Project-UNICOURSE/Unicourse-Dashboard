import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import AccessDeniedView from './AccessDeniedView';

// ----------------------------------------------------------------------

const PageAccessDenied = () => (
  <>
    <Helmet>
      <title> {`403 Access Denied! | Error - ${CONFIG.appName}`}</title>
    </Helmet>
    <AccessDeniedView />
  </>
);

export default PageAccessDenied;
