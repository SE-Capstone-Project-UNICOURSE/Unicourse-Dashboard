import helpers from '@app/utils/helpers';
import { Column } from '../models';
import { COMMON_CONSTANTS } from '@app/common/constants/appConstants';

export const columns: readonly Column[] = [
  { id: 'title', label: 'Khóa học', minWidth: 100 },
  {
    id: 'thumbnail',
    label: 'Ảnh Thumbnail',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Giá cả',
    minWidth: 170,
    align: 'center',
    format: (value: number) => helpers.formatPrice(value),
  },
  {
    id: 'created_at',
    label: 'Ngày tạo',
    minWidth: 170,
    align: 'center',
    format: (value: string) => helpers.formatDateToVN(value),
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center',
    format: (value: string) => helpers.formatStatus(value, COMMON_CONSTANTS.COURSE),
  },
  {
    id: 'action',
    label: 'Chức năng',
    minWidth: 170,
    align: 'center',
  },
];
