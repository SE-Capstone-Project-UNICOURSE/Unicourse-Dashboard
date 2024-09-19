import type { NotificationItemProps } from './components/NotificationsPopover';

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
    name: 'Website',
    logo: '/assets/icons/logo.png',
    plan: 'Premium',
  },
  {
    id: 'workspace-2',
    name: 'Mobile App',
    logo: '/assets/icons/logo.png',
    plan: 'Basic',
  },
];
