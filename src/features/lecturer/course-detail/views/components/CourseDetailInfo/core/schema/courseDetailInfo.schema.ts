import * as Yup from 'yup';

interface CourseFormValues {
  thumbnail: string;
  title: string;
  price: number;
  title_description: string;
  learning_outcome?: string[];
  requirements?: string[];
  category_id: number;
  description: string;
}

const courseDetailInfoValue: CourseFormValues = {
  thumbnail: '',
  title: '',
  price: 0,
  title_description: '',
  category_id: 0,
  description: '',
};

// Yup.object().shape({
//   learning_outcome: Yup.array()
//     .of(
//       Yup.string()
//         .required('Mục tiêu không được để trống')
//         .min(10, 'Mục tiêu cần ít nhất 10 ký tự'),
//     )
//     .min(1, 'Cần ít nhất một mục tiêu'),
// })

const validationSchema = Yup.object().shape({
  thumbnail: Yup.string().required('Hình ảnh là bắt buộc'),
  title: Yup.string().required('Tiêu đề là bắt buộc').min(10, 'Tiêu đề cần ít nhất 10 ký tự'),
  price: Yup.number().required('Giá là bắt buộc'),
  title_description: Yup.string()
    .required('Mô tả ngắn là bắt buộc')
    .min(10, 'Mô tả ngắn cần ít nhất 10 ký tự'),
  category_id: Yup.number().required('Danh mục là bắt buộc'),
  description: Yup.string()
    .required('Mô tả khóa học là bắt buộc')
    .min(10, 'Mô tả cần ít nhất 10 ký tự'),
});

export { courseDetailInfoValue, validationSchema };
export type { CourseFormValues };