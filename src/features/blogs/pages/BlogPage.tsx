import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import { BlogView } from '../view/BlogView';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <BlogView />
    </>
  );
}
