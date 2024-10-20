import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { BASE_URL } from '@app/common/constants/appConstants';
import DashboardLayout from '@app/features/dashboard/layouts/DashboardLayout/DashboardLayout';
import AuthLayout from '@features/auth/layouts/AuthLayout';
import RenderFallback from './components/RenderFallback';
import MainPages from './pages';
import PrivateRoute from './components/PrivateRoute';

const projectedRoutes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <Suspense fallback={<RenderFallback />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { element: <MainPages.HomePage />, index: true },
      { path: 'user', element: <MainPages.UserPage /> },
      { path: 'courses', element: <MainPages.CoursePage /> },
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
];

const Router = () => {
  console.log(BASE_URL);

  return useRoutes(projectedRoutes);
};

export default Router;
