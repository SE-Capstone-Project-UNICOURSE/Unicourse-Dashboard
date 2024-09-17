// ----------------------------------------------------------------------

import { lazy } from 'react';

const HomePage = lazy(() => import('src/features/dashboard/pages/DashboardPage'));
const BlogPage = lazy(() => import('src/features/blogs/pages/BlogPage'));
const UserPage = lazy(() => import('src/features/user/pages/UserPage'));
const SignInPage = lazy(() => import('src/features/auth/pages/SignIn'));
const ProductsPage = lazy(() => import('@features/courses/pages/ProductPages'));
const Page404 = lazy(() => import('src/features/error/PageNotFound'));

const MainPages = {
  HomePage,
  BlogPage,
  UserPage,
  SignInPage,
  ProductsPage,
  Page404,
};

export default MainPages;
