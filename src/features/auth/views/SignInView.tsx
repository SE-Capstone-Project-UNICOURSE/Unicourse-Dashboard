import Iconify from '@app/common/components/iconify/Iconify';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useAuthViewModel from '../viewmodels/useAuthViewModel';
import SignInForm from './SignInForm';

const SignInView = () => {
  const { signInWithGoogle } = useAuthViewModel();

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Truy cập bảng điều khiển</Typography>
      </Box>

      <SignInForm />

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          Hoặc
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton size="large" color="inherit" onClick={signInWithGoogle}>
          <Iconify icon="logos:google-icon" />
        </IconButton>
      </Box>
    </>
  );
};

export default SignInView;
