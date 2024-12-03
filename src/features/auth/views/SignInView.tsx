import Iconify from '@app/common/components/iconify/Iconify';
import LoadingIndicator from '@app/common/components/LoadingIndicator';
import { Logo } from '@app/common/components/logo';
import { useAppSelector } from '@app/stores';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useAuthViewModel from '../viewmodels/useAuthViewModel';
import SignInForm from './SignInForm';

const SignInView = () => {
  const { signInWithGoogle, handlePressShowDialog } = useAuthViewModel();

  const { isLoading, isLoadingSignIn } = useAppSelector((state) => state.authState.auth);

  return (
    <>
      <LoadingIndicator loading={isLoading || isLoadingSignIn} />
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Logo />
      </Box>

      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Truy cập bảng điều khiển</Typography>
      </Box>

      <SignInForm />

      <Divider sx={{ my: 1, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          Hoặc
        </Typography>
      </Divider>

      <LoadingButton
        fullWidth
        size="large"
        variant="outlined"
        onClick={signInWithGoogle}
        startIcon={<Iconify icon="logos:google-icon" />}
      >
        Đăng nhập bằng google
      </LoadingButton>
    </>
  );
};

export default SignInView;
