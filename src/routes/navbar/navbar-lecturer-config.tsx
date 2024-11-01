import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import ListIcon from '@mui/icons-material/List';
import ArticleIcon from '@mui/icons-material/Article';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReceiptIcon from '@mui/icons-material/Receipt';
import type { NavItemLecturerProps } from '@app/features/lecturer/dashboard/types';

const lecturerNavData: NavItemLecturerProps[] = [
  {
    title: 'Thông số',
    path: '/lecturer',
    icon: <AnalyticsIcon />,
  },
  {
    title: 'Khoá học',
    path: '/lecturer/courses',
    icon: <SchoolIcon />
  },
  {
    title: 'Bài viết',
    path: '/lecturer/blog',
    icon: <ArticleIcon />,
    children: [
      {
        title: 'Danh sách bài viết',
        path: '/lecturer/blog',
        icon: <ListIcon />,
      },
    ],
  },
  {
    title: 'Giao dịch',
    path: '/lecturer/transactions',
    icon: <ReceiptIcon />, // Using ReceiptIcon for transactions
    children: [
      {
        title: 'Danh sách giao dịch',
        path: '/lecturer/transactions/list',
        icon: <ListIcon />,
      },
    ],
  },
  {
    title: 'Phản hồi',
    path: '/lecturer/feedback',
    icon: <FeedbackIcon />, // Using FeedbackIcon for feedback
    children: [
      {
        title: 'Danh sách phản hồi',
        path: '/lecturer/feedback/list',
        icon: <ListIcon />,
      },
    ],
  },
  {
    title: 'Empty',
    path: '/lecturer/empty',
    icon: <SchoolIcon />,
  },
];

export default lecturerNavData;
