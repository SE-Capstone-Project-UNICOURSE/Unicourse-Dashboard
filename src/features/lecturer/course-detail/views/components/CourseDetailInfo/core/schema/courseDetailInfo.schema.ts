import * as Yup from 'yup';

interface CourseFormValues {
  title: string;
  price: number;
  title_description: string;
  learning_outcome?: string[] | any;
  requirements?: string[] | any;
  category_id: number;
  description: string;
}

const courseDetailInfoValue = {
  title: '',
  price: 0,
  title_description: '',
  learning_outcome: [],
  requirements: [],
  category_id: 0,
  description: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Tiêu đề là bắt buộc').min(10, 'Tiêu đề cần ít nhất 10 ký tự'),
  price: Yup.number().required('Giá là bắt buộc'),
  title_description: Yup.string()
    .required('Mô tả ngắn là bắt buộc')
    .min(10, 'Mô tả ngắn cần ít nhất 10 ký tự'),
  learning_outcome: Yup.array()
    .of(Yup.string().required('Mục tiêu không được bỏ trống').min(1))
    .min(1, 'Ít nhất một mục tiêu'),
  requirements: Yup.array()
    .of(Yup.string().required('Yêu cầu không được bỏ trống').min(1))
    .min(1, 'Ít nhất một yêu cầu'),
  category_id: Yup.number().required('Danh mục là bắt buộc'),
  description: Yup.string()
    .required('Mô tả khóa học là bắt buộc')
    .min(10, 'Mô tả cần ít nhất 10 ký tự'),
});

export { courseDetailInfoValue, validationSchema };
export type { CourseFormValues };
