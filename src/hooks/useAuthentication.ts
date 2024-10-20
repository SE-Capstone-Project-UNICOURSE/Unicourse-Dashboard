const useAuth = () => {
  // Giả sử bạn lưu token và thông tin user trong localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return {
    isAuthenticated: !!user.token, // Kiểm tra xem người dùng đã đăng nhập chưa
    role: user.role || 'guest', // Lấy role của người dùng, mặc định là 'guest'
  };
};

export default useAuth;
