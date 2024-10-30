import type User from '@app/features/auth/models/User.model';
import RouterLink from '@app/routes/components/RouterLink';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch } from '@app/stores';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import SimpleLayout from '../admin/dashboard/layouts/simple/SimpleLayout';
import { setUserInfo } from '../auth/slices';

// ----------------------------------------------------------------------

const AccessDeniedView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let route = '/sign-in';

  useEffect(() => {
    const handleCheckPermissionUser = () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          // Decode the token to check user role
          const decodedToken = jwtDecode<User>(accessToken);
          const userRole = decodedToken.role?.toLowerCase();
          if (userRole) {
            route = `/${userRole}`;
            dispatch(setUserInfo(decodedToken));
          } else {
            route = '/sign-in';
          }
        } catch (error) {
          route = '/sign-in';
        }
      } else {
        route = '/sign-in';
      }
    };

    handleCheckPermissionUser();
  }, [router]);

  return (
    <SimpleLayout content={{ compact: true }}>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Access Denied!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, you don’t have permission to access this page. Please contact your administrator if
          you think this is a mistake.
        </Typography>

        <Box
          component="img"
          src="/assets/images/access-denied.jpg"
          sx={{
            width: 520,
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button
          component={RouterLink}
          href={route}
          size="large"
          variant="contained"
          color="inherit"
        >
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
};

export default AccessDeniedView;
