import { CONFIG } from '@app/utils/config-global';
import { Helmet } from 'react-helmet-async';
import { BlogView } from './views/BlogView';

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
