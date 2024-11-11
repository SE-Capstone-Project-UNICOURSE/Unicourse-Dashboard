import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { GlobalBreadcrumbProps } from './core/models';
import useRouter from '@app/routes/hooks/useRouter';

const GlobalBreadcrumb: React.FC<GlobalBreadcrumbProps> = ({
  items,
  separator = <NavigateNextIcon fontSize="small" />,
}) => {
    const router = useRouter();

  return (
    <Breadcrumbs separator={separator} aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <Link
            key={index}
            color="inherit"
            href={item.href}
            onClick={() => router.push(`${item.href}`)}
            underline="hover"
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default GlobalBreadcrumb;
