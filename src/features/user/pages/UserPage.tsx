import { CONFIG } from '@utils/config-global';
import { Helmet } from 'react-helmet-async';
import { UserView } from '../view/UserView';

// ----------------------------------------------------------------------

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
