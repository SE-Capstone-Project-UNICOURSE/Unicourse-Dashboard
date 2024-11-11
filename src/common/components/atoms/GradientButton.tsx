import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface GradientButtonProps extends Omit<ButtonProps, 'color'> {
  gradientStart?: string;
  gradientEnd?: string;
}

const GradientButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'gradientStart' && prop !== 'gradientEnd',
})<GradientButtonProps>(({ theme, gradientStart, gradientEnd, variant }) => ({
  background:
    variant === 'outlined'
      ? 'transparent'
      : `linear-gradient(45deg, ${gradientStart || '#9F80F8'}, ${gradientEnd || '#1CB5E0'})`,
  color: variant === 'outlined' ? gradientEnd || '#1CB5E0' : '#ffffff',
  borderRadius: '8px',
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  boxShadow: variant === 'outlined' ? 'none' : '0px 4px 15px rgba(0, 0, 0, 0.2)',
  border: variant === 'outlined' ? `2px solid ${gradientEnd || '#1CB5E0'}` : 'none',
  '&:hover': {
    background:
      variant === 'outlined'
        ? 'rgba(28, 181, 224, 0.1)' // A light background on hover for outlined variant
        : `linear-gradient(45deg, ${gradientStart || '#d01cc5'}, ${gradientEnd || '#1BA5D0'})`,
  },
}));

export default GradientButton;
