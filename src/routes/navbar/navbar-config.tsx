import { SvgColor } from '@app/common/components/svg-color';
import type { NavItemProps } from '@app/features/dashboard/types';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

const navData: NavItemProps[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Người dùng',
    path: '/user',
    icon: icon('ic-user'),
    children: [{ title: 'Danh sách người dùng', path: '/user', icon: icon('ic-list') }],
  },
  {
    title: 'Khoá học',
    path: '/courses',
    icon: icon('ic-courses'),
    children: [{ title: 'Danh sách khoá học', path: '/courses', icon: icon('ic-list') }],
  },
  {
    title: 'Bài viết',
    path: '/blog',
    icon: icon('ic-blog'),
    children: [
      {
        title: 'Danh sách bài viết',
        path: '/blog',
        icon: icon('ic-list'),
      },
    ],
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];

export default navData;
