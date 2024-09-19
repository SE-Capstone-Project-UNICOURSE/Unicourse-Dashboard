import { CONFIG } from '@utils/config-global';
import { Helmet } from 'react-helmet-async';
import { UserView } from './views/UserView';

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
