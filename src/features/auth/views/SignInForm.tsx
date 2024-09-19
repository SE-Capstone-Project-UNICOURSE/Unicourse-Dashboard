import Iconify from '@app/components/iconify/Iconify';
import useRouter from '@app/routes/hooks/useRouter';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { useCallback, useState } from 'react';

const SignInForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="hello@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
    </Box>
  );
};

export default SignInForm;
