import { ACCESS_TOKEN, REFRESH_TOKEN } from '@app/common/constants/appConstants';

const useGetAccessRefreshToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

export default useGetAccessRefreshToken;
