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
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
    children: [{ title: 'User List', path: '/user', icon: icon('ic-list') }],
  },
  {
    title: 'Courses',
    path: '/courses',
    icon: icon('ic-courses'),
    children: [{ title: 'Course List', path: '/courses', icon: icon('ic-list') }],
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
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
