import RouterLink from '@app/routes/components/RouterLink';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { forwardRef } from 'react';
import { logoClasses } from './classes';

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const logoPath = '/assets/icons/logo.png';

    const singleLogo = (
      <Box alt="Single logo" component="img" src={logoPath} width="100%" height="100%" />
    );

    const fullLogo = (
      <Box alt="Single logo" component="img" src={logoPath} width="100%" height="100%" />
    );

    const baseSize = {
      width: width ?? 100, // Increase the width for a larger logo
      height: height ?? 100, // Increase the height for a larger logo
      ...(!isSingle && {
        width: width ?? 200,
        height: height ?? 80,
      }),
    };

    return (
      <Box
        ref={ref}
        component={disableLink ? 'div' : RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
