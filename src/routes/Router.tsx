import AccessDeniedView from '@app/features/error/AccessDeniedView';
import PageNotFound from '@app/features/error/PageNotFound'; // Import Page 404 chung
import { useRoutes } from 'react-router-dom';
import adminRoutes from './config/AdminRoutes';
import lecturerRoutes from './config/LecturerRoutes';

// Access Denied route
const accessDeniedRoute = {
  path: '/access-denied',
  element: <AccessDeniedView />,
};

const Router = () =>
  useRoutes([
    ...adminRoutes,
    ...lecturerRoutes,
    accessDeniedRoute,
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

export default Router;
