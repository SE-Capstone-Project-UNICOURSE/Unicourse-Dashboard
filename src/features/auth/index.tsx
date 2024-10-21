import { CONFIG } from '@utils/config-global';
import { Helmet } from 'react-helmet-async';
import SignInView from './views/SignInView';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Đăng nhập bảng điều khiển - ${CONFIG.appName}`}</title>
      </Helmet>
      <SignInView />
    </>
  );
}
