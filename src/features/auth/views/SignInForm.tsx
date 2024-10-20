import Iconify from '@app/common/components/iconify/Iconify';
import useRouter from '@app/routes/hooks/useRouter';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useCallback, useState } from 'react';

const SignInForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        token: 'dummyToken123456', // Token giả lập
        role: 'lecturer', // Vai trò người dùng giả lập là admin
      })
    );

    router.push('/lecturer');
  }, [router]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Địa chỉ Email"
        defaultValue="hello@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Mật khẩu"
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
        Đăng nhập
      </LoadingButton>
    </Box>
  );
};

export default SignInForm;
