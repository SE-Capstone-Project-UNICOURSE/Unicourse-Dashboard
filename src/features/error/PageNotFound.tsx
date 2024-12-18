import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import NotFoundView from './NotFoundView';

// ----------------------------------------------------------------------

const PageNotFound = () => (
  <>
    <Helmet>
      <title> {`404 page not found! | Error - ${CONFIG.appName}`}</title>
    </Helmet>
    <NotFoundView />
  </>
);

export default PageNotFound;
