import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import CourseView from './views/CoursesLecturerView';

// ----------------------------------------------------------------------

const CourseLecturerPages = () => (
  <>
    <Helmet>
      <title> {`Products - ${CONFIG.appName}`}</title>
    </Helmet>

    <CourseView />
  </>
);

export default CourseLecturerPages;
