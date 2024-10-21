import AuthLayout from '@app/features/auth/layouts/AuthLayout';
import DashboardLectureLayout from '@app/features/lecturer/dashboard/layouts/DashboardLayout/DashboardLectureLayout';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import RenderFallback from '../components/RenderFallback';
import { LecturerPages } from '../pages';

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
      { path: 'empty', element: <LecturerPages.EmptyLecturesPage /> },
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

export default lecturerRoutes;
