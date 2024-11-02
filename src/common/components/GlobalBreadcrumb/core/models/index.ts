export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export interface GlobalBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}
