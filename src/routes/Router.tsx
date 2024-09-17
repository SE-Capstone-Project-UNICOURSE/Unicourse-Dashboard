import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from '@features/auth';
import { DashboardLayout } from '@features/dashboard';
import { varAlpha } from '@theme/styles';
import MainPages from './pages';

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <MainPages.HomePage />, index: true },
        { path: 'user', element: <MainPages.UserPage /> },
        { path: 'products', element: <MainPages.ProductsPage /> },
        { path: 'blog', element: <MainPages.BlogPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <MainPages.SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <MainPages.Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);
