// Mock data for posts
const _posts = [
  {
    id: '1',
    title: 'Breaking News: Market Hits Record High',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'The stock market reached new heights today...',
    postedAt: new Date('2023-09-15T10:30:00'),
  },
  {
    id: '2',
    title: 'New Tech Trends in 2024',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Explore the latest trends in technology...',
    postedAt: new Date('2023-09-14T08:45:00'),
  },
  {
    id: '3',
    title: 'Climate Change: What We Can Do',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Find out how you can make a difference...',
    postedAt: new Date('2023-09-13T12:00:00'),
  },
  {
    id: '4',
    title: 'Startup Funding Reaches All-time High',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'The venture capital funding in startups is...',
    postedAt: new Date('2023-09-12T14:30:00'),
  },
  {
    id: '5',
    title: 'Healthcare Innovation in 2024',
    coverUrl: 'https://via.placeholder.com/150',
    description: 'Learn about the latest innovations in healthcare...',
    postedAt: new Date('2023-09-11T09:20:00'),
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

export { _posts, _tasks, _timeline };
