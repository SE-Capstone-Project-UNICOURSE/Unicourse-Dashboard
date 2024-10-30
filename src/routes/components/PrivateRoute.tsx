import { setUserInfo } from '@app/features/auth/slices';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken || userInfo == null) {
      <Navigate to="/sign-in" replace />;
    }
  }, [accessToken, userInfo]);

  if (!accessToken || !userInfo) {
    dispatch(setUserInfo(null));
    return <Navigate to="/sign-in" replace />;
  }

  if (userInfo?.role && !allowedRoles.includes(userInfo.role.toLowerCase())) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
