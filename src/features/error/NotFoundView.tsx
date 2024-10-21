import RouterLink from '@app/routes/components/RouterLink';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SimpleLayout from '../admin/dashboard/layouts/simple/SimpleLayout';
import { useAppSelector } from '@app/stores';
import useRouter from '@app/routes/hooks/useRouter';

const NotFoundView = () => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);
  const router = useRouter();

  return (
    <SimpleLayout content={{ compact: true }}>
      <Container>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration-404.svg"
          sx={{
            width: 260,
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        />

        <Box display="flex" justifyContent="center" gap={4} mt={3}>
          {/* Button for "Back" */}
          <Button
            component={RouterLink}
            size="large"
            variant="contained"
            color="inherit"
            onClick={() => router.back()}
          >
            Back
          </Button>

          {/* Button for "Home" */}
          <Button
            component={RouterLink}
            href={`/${userInfo?.role.toLowerCase() || 'sign-in'}`}
            size="large"
            variant="contained"
            color="inherit"
          >
            Home
          </Button>
        </Box>
      </Container>
    </SimpleLayout>
  );
};

export default NotFoundView;
