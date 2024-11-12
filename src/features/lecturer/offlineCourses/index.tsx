import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import OfflineCourseLectureView from './views/OfflineCourseLectureView';

// ----------------------------------------------------------------------

const CourseOfflineLecturerPages = () => (
  <>
    <Helmet>
      <title> {`Khoá trực tiếp - ${CONFIG.appName}`}</title>
    </Helmet>
    <OfflineCourseLectureView />
  </>
);

export default CourseOfflineLecturerPages;
