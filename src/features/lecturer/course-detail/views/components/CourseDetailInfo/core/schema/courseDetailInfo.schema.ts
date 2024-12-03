import { COMMON_CONSTANTS } from '@app/common/constants/appConstants';
import * as Yup from 'yup';

interface CourseFormValues {
  title: string;
  price: number;
  title_description: string;
  learning_outcome?: string[];
  requirements?: string[];
  category_id: number;
  description: string;
  status: string;
}

const courseDetailInfoValue: CourseFormValues = {
  title: '',
  price: 0,
  title_description: '',
  category_id: 0,
  description: '',
  learning_outcome: [''],
  requirements: [''],
  status: COMMON_CONSTANTS.DRAFT,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Tiêu đề là bắt buộc').min(10, 'Tiêu đề cần ít nhất 10 ký tự'),
  price: Yup.number().required('Giá là bắt buộc'),
  title_description: Yup.string()
    .required('Mô tả ngắn là bắt buộc')
    .min(10, 'Mô tả ngắn cần ít nhất 10 ký tự'),
  category_id: Yup.number().required('Danh mục là bắt buộc'),
  description: Yup.string()
    .required('Mô tả khóa học là bắt buộc')
    .min(10, 'Mô tả cần ít nhất 10 ký tự'),
  status: Yup.string()
    .oneOf([COMMON_CONSTANTS.DRAFT, COMMON_CONSTANTS.PUBLISHED, COMMON_CONSTANTS.CLOSED], 'Trạng thái không hợp lệ')
    .required('Trạng thái là bắt buộc'),
});

export { courseDetailInfoValue, validationSchema };
export type { CourseFormValues };