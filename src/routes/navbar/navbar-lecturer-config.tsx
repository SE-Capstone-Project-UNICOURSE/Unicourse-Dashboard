import { SvgColor } from '@app/common/components/svg-color';
import type { NavItemLecturerProps } from '@app/features/lecturer/dashboard/types';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

const lecturerNavData: NavItemLecturerProps[] = [
  {
    title: 'Bảng điều khiển',
    path: '/lecturer',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Khoá học',
    path: '/lecturer/courses',
    icon: icon('ic-courses'),
    children: [{ title: 'Danh sách khoá học', path: '/lecturer/courses', icon: icon('ic-list') }],
  },
  {
    title: 'Bài viết',
    path: '/lecturer/blog',
    icon: icon('ic-blog'),
    children: [
      {
        title: 'Danh sách bài viết',
        path: '/lecturer/blog',
        icon: icon('ic-list'),
      },
    ],
  },
  {
    title: 'Empty',
    path: '/lecturer/empty',
    icon: icon('ic-courses'),
  },
];

export default lecturerNavData;
