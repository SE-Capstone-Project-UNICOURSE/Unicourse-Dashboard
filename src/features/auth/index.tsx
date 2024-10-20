import { Logo } from '@app/common/components/logo';
import { Box } from '@mui/material';
import { CONFIG } from '@utils/config-global';
import { Helmet } from 'react-helmet-async';
import SignInView from './views/SignInView';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Đăng nhập bảng điều khiển - ${CONFIG.appName}`}</title>
      </Helmet>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Logo />
      </Box>
      <SignInView />
    </>
  );
}
