import { useAppSelector } from '@app/stores';

const useAuthentication = () => {
  const { userInfo } = useAppSelector((state) => state.authState.auth);

  return {};
};

export default useAuthentication;
