import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

interface LoadingIndicatorProps {
  loading: boolean;
}

const LoadingIndicator = ({ loading }: LoadingIndicatorProps) => {
  if (!loading) return null;

  return (
    <Backdrop
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: (theme) => theme.zIndex.drawer + 1, // Đảm bảo Loading nằm trên cùng
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Màu nền mờ
      }}
      open={loading}
    >
      <Stack spacing={2} sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </Stack>
    </Backdrop>
  );
};

export default LoadingIndicator;
