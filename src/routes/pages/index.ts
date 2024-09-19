import { lazy } from 'react';

const HomePage = lazy(() => import('@app/features/dashboard/pages/DashboardPage'));
const BlogPage = lazy(() => import('@app/features/blogs'));
const UserPage = lazy(() => import('@app/features/users'));
const SignInPage = lazy(() => import('src/features/auth'));
const CoursePage = lazy(() => import('@features/courses/'));
const Page404 = lazy(() => import('src/features/error'));

const MainPages = {
  HomePage,
  BlogPage,
  UserPage,
  SignInPage,
  CoursePage,
  Page404,
};

export default MainPages;
