import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import CourseDetailView from './views/CourseDetailView';

const CourseDetailLecturerPages = () => (
  <>
    <Helmet>
      <title> {`Products - ${CONFIG.appName}`}</title>
    </Helmet>

    <CourseDetailView />
  </>
);

export default CourseDetailLecturerPages;
