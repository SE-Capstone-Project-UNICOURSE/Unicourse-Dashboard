import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import { NotFoundView } from './NotFoundView';

// ----------------------------------------------------------------------

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title> {`404 page not found! | Error - ${CONFIG.appName}`}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
