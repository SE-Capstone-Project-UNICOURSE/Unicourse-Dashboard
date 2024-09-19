import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import type { ReactNode } from 'react';

export type NavItem = {
  path: string;
  title: string;
  icon: ReactNode;
  info?: ReactNode;
};

export type NavGroup = {
  title: string;
  icon: ReactNode;
  group: true;
  items: NavItem[];
};

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};
