import AccessDeniedView from '@app/features/error/AccessDeniedView';
import PageNotFound from '@app/features/error/PageNotFound'; // Import common Page 404
import { Navigate, useRoutes } from 'react-router-dom';
import adminRoutes from './config/AdminRoutes';
import lecturerRoutes from './config/LecturerRoutes';
import { useAppSelector } from '@app/stores'; // Import to get user state

const accessDeniedRoute = {
  path: '/access-denied',
  element: <AccessDeniedView />,
};

const RootRedirect = () => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);

  if (!userInfo) {
    return <Navigate to="/sign-in" replace />;
  }

  switch (userInfo.role.toLowerCase()) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'lecturer':
      return <Navigate to="/lecturer" replace />;
    default:
      return <Navigate to="/access-denied" replace />;
  }
};

const Router = () =>
  useRoutes([
    {
      path: '/',
      element: <RootRedirect />,
    },
    ...adminRoutes, // Admin routes
    ...lecturerRoutes, // Lecturer routes
    accessDeniedRoute, // Access denied route
    {
      path: '*',
      element: <PageNotFound />, // Handle 404
    },
  ]);

export default Router;
