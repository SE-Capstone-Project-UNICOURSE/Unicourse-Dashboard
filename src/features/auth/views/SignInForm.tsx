import Iconify from '@app/common/components/iconify/Iconify';
import useRouter from '@app/routes/hooks/useRouter';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import signInSchema from '../schema/signIn.schema';

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = useCallback(
    (data) => {
      console.log('Form data:', data);

      router.push('/lecturer');
    },
    [router]
  );

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      onSubmit={handleSubmit(handleSignIn)} // Use handleSubmit from react-hook-form
    >
      <TextField
        fullWidth
        label="Địa chỉ Email"
        {...register('email')} // Use register from react-hook-form
        error={!!errors.email} // MUI error prop to show red border if validation fails
        helperText={errors.email?.message} // Display validation error message
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        {...register('password')} // Use register from react-hook-form
        error={!!errors.password} // MUI error prop to show red border if validation fails
        helperText={errors.password?.message} // Display validation error message
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

      <LoadingButton fullWidth size="large" type="submit" color="inherit" variant="contained">
        Đăng nhập
      </LoadingButton>
    </Box>
  );
};

export default SignInForm;
