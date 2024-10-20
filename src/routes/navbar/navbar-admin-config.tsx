import { SvgColor } from '@app/common/components/svg-color';
import type { NavItemProps } from '@app/features/admin/dashboard/types';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

const adminNavData: NavItemProps[] = [
  {
    title: 'Bảng điều khiển',
    path: '/admin',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Người dùng',
    path: '/admin/user',
    icon: icon('ic-user'),
    children: [{ title: 'Danh sách người dùng', path: '/admin/user', icon: icon('ic-list') }],
  },
  {
    title: 'Khoá học',
    path: '/admin/courses',
    icon: icon('ic-courses'),
    children: [{ title: 'Danh sách khoá học', path: '/admin/courses', icon: icon('ic-list') }],
  },
  {
    title: 'Bài viết',
    path: '/admin/blog',
    icon: icon('ic-blog'),
    children: [
      {
        title: 'Danh sách bài viết',
        path: '/admin/blog',
        icon: icon('ic-list'),
      },
    ],
  },
];

export default adminNavData;
