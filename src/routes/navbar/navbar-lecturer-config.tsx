import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import ListIcon from '@mui/icons-material/List';
import ArticleIcon from '@mui/icons-material/Article';
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
    icon: <SchoolIcon />,
    children: [{ title: 'Danh sách khoá học', path: '/lecturer/courses', icon: <ListIcon /> }],
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
    title: 'Empty',
    path: '/lecturer/empty',
    icon: <SchoolIcon />,
  },
];

export default lecturerNavData;
