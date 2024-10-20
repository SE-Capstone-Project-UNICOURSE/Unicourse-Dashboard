import Iconify from '@app/common/components/iconify/Iconify';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SignInForm from './SignInForm';

const SignInView = () => (
  <>
    <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
      <Typography variant="h5">Admin Sign In</Typography>
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
      <IconButton size="large" color="inherit">
        <Iconify icon="logos:google-icon" />
      </IconButton>
    </Box>
  </>
);

export default SignInView;
