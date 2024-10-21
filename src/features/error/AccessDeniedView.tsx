import RouterLink from '@app/routes/components/RouterLink';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppSelector } from '@app/stores';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SimpleLayout from '../admin/dashboard/layouts/simple/SimpleLayout';

// ----------------------------------------------------------------------

const AccessDeniedView = () => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);
  const router = useRouter();

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
          href={`/${userInfo?.role.toLowerCase() || 'sign-in'}`}
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
