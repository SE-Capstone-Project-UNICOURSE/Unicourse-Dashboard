const useAuththentication = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return { isAuthenticated };
};

export default useAuththentication;
