import { Suspense } from 'react';
import PrivateRoute from '../components/PrivateRoute';
import RenderFallback from '../components/RenderFallback';
import AdminDashboardLayout from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardLayout';
import { Outlet } from 'react-router-dom';
import { AdminPages } from '../pages';
import AuthLayout from '@app/features/auth/layouts/AuthLayout';

const adminRoutes = [
  {
    path: '/admin',
    element: (
      <PrivateRoute allowedRoles={['admin']}>
        <AdminDashboardLayout>
          <Suspense fallback={<RenderFallback />}>
            <Outlet />
          </Suspense>
        </AdminDashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { element: <AdminPages.HomePage />, index: true },
      { path: 'user', element: <AdminPages.UserPage /> },
      { path: 'courses', element: <AdminPages.CoursePage /> },
      { path: 'blog', element: <AdminPages.BlogPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <AdminPages.SignInPage />
      </AuthLayout>
    ),
  },
];

export default adminRoutes;
