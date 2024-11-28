import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/utils/config-global';
import ChapterView from './views/ChapterView';


const ChapterDetailLecturerPages = () => (
  <>
    <Helmet>
      <title> {`Products - ${CONFIG.appName}`}</title>
    </Helmet>

    <ChapterView />
  </>
);

export default ChapterDetailLecturerPages;
