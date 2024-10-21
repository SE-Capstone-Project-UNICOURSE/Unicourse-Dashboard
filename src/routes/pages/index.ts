import { lazy } from 'react';

// Page Common
const Page404 = lazy(() => import('@app/features/error/PageNotFound'));
const SignInPage = lazy(() => import('@app/features/auth'));
const AccessDeniedPage = lazy(() => import('@app/features/error/PageAccessDenied'));

// Admin
const HomePage = lazy(() => import('@app/features/admin/dashboard/pages/DashboardPage'));
const BlogPage = lazy(() => import('@app/features/admin/blogs'));
const UserPage = lazy(() => import('@app/features/admin/users'));
const CoursePage = lazy(() => import('@app/features/admin/courses'));
const EmptyPage = lazy(() => import('@app/features/admin/empty'));

const AdminPages = {
  HomePage,
  BlogPage,
  UserPage,
  SignInPage,
  CoursePage,
  Page404,
  AccessDeniedPage,
  EmptyPage,
};

// Lecturers
const CourseLecturerPage = lazy(() => import('@app/features/lecturer/courses'));
const BlogLecturerPage = lazy(() => import('@app/features/lecturer/blogs'));
const HomeLecturerPage = lazy(
  () => import('@app/features/lecturer/dashboard/pages/DashboardLecturerPage')
);
const EmptyLecturesPage = lazy(() => import('@app/features/lecturer/empty'));

const LecturerPages = {
  HomeLecturerPage,
  SignInPage,
  CourseLecturerPage,
  Page404,
  BlogLecturerPage,
  AccessDeniedPage,
  EmptyLecturesPage,
};
export { AdminPages, LecturerPages };
