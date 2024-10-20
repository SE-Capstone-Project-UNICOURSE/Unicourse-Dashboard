import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import AdminDashboardLayout from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardLayout';
import AccessDeniedView from '@app/features/error/AccessDeniedView';
import PageNotFound from '@app/features/error/PageNotFound'; // Import Page 404 chung
import DashboardLectureLayout from '@app/features/lecturer/dashboard/layouts/DashboardLayout/DashboardLectureLayout';
import useAuthentication from '@app/hooks/useAuthentication'; // Import hook để lấy thông tin user
import AuthLayout from '@features/auth/layouts/AuthLayout';
import PrivateRoute from './components/PrivateRoute';
import RenderFallback from './components/RenderFallback';
import { AdminPages, LecturerPages } from './pages';

// Access Denied route
const accessDeniedRoute = {
  path: '/access-denied',
  element: <AccessDeniedView />,
};

// Admin routes
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

// Lecturer routes
const lecturerRoutes = [
  {
    path: '/lecturer',
    element: (
      <PrivateRoute allowedRoles={['lecturer']}>
        <DashboardLectureLayout>
          <Suspense fallback={<RenderFallback />}>
            <Outlet />
          </Suspense>
        </DashboardLectureLayout>
      </PrivateRoute>
    ),
    children: [
      { element: <LecturerPages.HomeLecturerPage />, index: true }, // Đảm bảo đây là index
      { path: 'courses', element: <LecturerPages.CourseLecturerPage /> },
      { path: 'blog', element: <LecturerPages.BlogLecturerPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <LecturerPages.SignInPage />
      </AuthLayout>
    ),
  },
];

// Combine the routes with a dynamic role for 404 page
const Router = () => {
  const { role } = useAuthentication();

  return useRoutes([
    ...adminRoutes,
    ...lecturerRoutes,
    accessDeniedRoute,
    {
      path: '*', // Trang 404 dùng chung
      element: <PageNotFound role={role} />, // Truyền role để điều hướng đúng trang chủ
    },
  ]);
};

export default Router;
