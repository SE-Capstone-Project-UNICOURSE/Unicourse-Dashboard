import { CONFIG } from '@utils/config-global';
import { Helmet } from 'react-helmet-async';
import EmptyView from './views/EmptyView';

const EmptyPage = () => (
  <>
    <Helmet>
      <title> {`Users - ${CONFIG.appName}`}</title>
    </Helmet>

    <EmptyView />
  </>
);

export default EmptyPage;
