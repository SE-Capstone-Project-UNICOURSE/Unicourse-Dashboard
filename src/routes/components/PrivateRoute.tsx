import { setUserInfo } from '@app/features/auth/slices';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Các role được phép truy cập vào route
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || !userInfo) {
    dispatch(setUserInfo(null));
    return <Navigate to="/sign-in" replace />;
  }

  if (userInfo?.role && !allowedRoles.includes(userInfo?.role.toLowerCase())) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
