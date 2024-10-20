import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import CourseView from './views/CoursesView';

// ----------------------------------------------------------------------

export default function CoursePages() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <CourseView />
    </>
  );
}
