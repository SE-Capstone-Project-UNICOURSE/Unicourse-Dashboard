// Mock data for posts
const _posts = [
  {
    id: '1',
    title: 'Thanh toán thành công khoá học "Spring Boot Cơ Bản"',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Người dùng đã hoàn tất thanh toán cho khoá học này.',
    postedAt: new Date('2024-11-14T10:30:00'),
    price: 1500000,
  },
  {
    id: '2',
    title: 'Khóa học "ReactJS Nâng Cao" được đăng ký',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Người dùng mới vừa đăng ký tham gia khoá học ReactJS.',
    postedAt: new Date('2024-11-13T08:45:00'),
    price: 2500000,
  },
  {
    id: '3',
    title: 'Hoàn tất thanh toán khoá học "Node.js Mastery"',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Giao dịch thanh toán qua ví điện tử đã hoàn tất.',
    postedAt: new Date('2024-11-12T12:00:00'),
    price: 1800000,
  },
  {
    id: '4',
    title: 'Hoàn tiền cho giao dịch thất bại',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Một giao dịch không thành công đã được hoàn tiền.',
    postedAt: new Date('2024-11-11T14:30:00'),
    price: -500000, // Số tiền âm biểu thị hoàn tiền
  },
  {
    id: '5',
    title: 'Khóa học "Python for Data Science" đã được kích hoạt',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Người dùng đã kích hoạt quyền truy cập khoá học.',
    postedAt: new Date('2024-11-10T09:20:00'),
    price: 2000000,
  },
];


// Mock data for order timeline
const _timeline = [
  { id: '1', type: 'order1', title: 'Order #12345 confirmed', time: '2023-09-15 10:30:00' },
  { id: '2', type: 'order2', title: 'Order #12345 packed', time: '2023-09-15 12:45:00' },
  { id: '3', type: 'order3', title: 'Order #12345 shipped', time: '2023-09-15 14:30:00' },
  { id: '4', type: 'order4', title: 'Order #12345 delivered', time: '2023-09-16 10:00:00' },
];

// Mock data for tasks
const _tasks = [
  { id: '1', name: 'Complete project report' },
  { id: '2', name: 'Design website UI' },
  { id: '3', name: 'Implement API integration' },
  { id: '4', name: 'Test new features' },
  { id: '5', name: 'Prepare presentation slides' },
];

const _transactions = [
  {
    id: '1',
    transactionId: 'TX123456',
    amount: '500,000 VND',
    status: 'Đã hoàn thành',
    time: new Date('2023-09-15T10:30:00'),
  },
  {
    id: '2',
    transactionId: 'TX123457',
    amount: '1,000,000 VND',
    status: 'Chờ xử lý',
    time: new Date('2023-09-14T08:45:00'),
  },
  {
    id: '3',
    transactionId: 'TX123458',
    amount: '2,000,000 VND',
    status: 'Đã hoàn thành',
    time: new Date('2023-09-13T12:00:00'),
  },
  {
    id: '4',
    transactionId: 'TX123459',
    amount: '300,000 VND',
    status: 'Đã hủy',
    time: new Date('2023-09-12T14:30:00'),
  },
  {
    id: '5',
    transactionId: 'TX123460',
    amount: '1,500,000 VND',
    status: 'Đã hoàn thành',
    time: new Date('2023-09-11T09:20:00'),
  },
];

export { _posts, _tasks, _timeline, _transactions };
