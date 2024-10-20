import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import useAuththentication from '@app/hooks/useAuthentication';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuththentication();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
