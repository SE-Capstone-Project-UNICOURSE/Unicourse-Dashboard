export interface Column {
  id: 'id' | 'course' | 'thumbnail' | 'price' | 'created_at' | 'status' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: any) => string;
}