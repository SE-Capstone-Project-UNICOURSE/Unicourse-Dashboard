import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import type { ReactNode } from 'react';

export type NavItem = {
  path?: string; // For collapsible groups, there may be no direct path
  title: string;
  icon: ReactNode;
  info?: ReactNode;
  children?: NavItem[]; // Allow sub-items
};

export type NavContentProps = {
  data: NavItem[]; // Each nav item can either be a link or a collapsible group with sub-items
  slots?: {
    topArea?: ReactNode;
    bottomArea?: ReactNode;
  };
  sx?: SxProps<Theme>;
};

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};
