// src/_mock/mockData.ts

import { NotificationItemProps } from './components/NotificationsPopover';

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic_flag_de.svg',
  },
];

export const _notifications: NotificationItemProps[] = [
  {
    id: '1',
    title: 'Order placed',
    description: 'You have placed an order successfully',
    type: 'order-placed',
    avatarUrl: null,
    isUnRead: true,
    postedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Order shipped',
    description: 'Your order has been shipped',
    type: 'order-shipped',
    avatarUrl: null,
    isUnRead: true,
    postedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'New message',
    description: 'You have received a new message',
    type: 'chat-message',
    avatarUrl: '/assets/icons/notification/ic-notification-chat.svg',
    isUnRead: false,
    postedAt: new Date().toISOString(),
  },
];

export const _workspaces = [
  {
    id: 'workspace-1',
    name: 'Tech Innovators',
    logo: '/assets/logos/tech-innovators.svg',
    plan: 'Premium',
  },
  {
    id: 'workspace-2',
    name: 'Design Creators',
    logo: '/assets/logos/design-creators.svg',
    plan: 'Basic',
  },
  {
    id: 'workspace-3',
    name: 'Finance Gurus',
    logo: '/assets/logos/finance-gurus.svg',
    plan: 'Business',
  },
  {
    id: 'workspace-4',
    name: 'Health Advocates',
    logo: '/assets/logos/health-advocates.svg',
    plan: 'Enterprise',
  },
];
