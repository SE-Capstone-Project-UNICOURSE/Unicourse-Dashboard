import { CONFIG } from '@app/utils/config-global';
import { Helmet } from 'react-helmet-async';
import { BlogView } from './views/BlogView';

// ----------------------------------------------------------------------

const BlogPage = () => (
  <>
    <Helmet>
      <title> {`Blog - ${CONFIG.appName}`}</title>
    </Helmet>

    <BlogView />
  </>
);

export default BlogPage;
