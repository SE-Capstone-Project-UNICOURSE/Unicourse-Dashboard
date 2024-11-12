export type Center = {
  id: number;
  address: string;
  description: string;
  lat: number;
  long: number;
  status: 'PUBLISHED' | 'UNPUBLISHED' | 'DRAFT';
  created_at: string;
  updated_at: string;
};
