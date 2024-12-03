import * as Yup from 'yup';

const courseMentorEditAction = Yup.object().shape({
  title: Yup.string().required('Bắt buộc phải có tiêu đề'),
  amount: Yup.number().positive().required('Phải có giá cả'),
  discount: Yup.number()
    .min(0, 'Giảm giá không được nhỏ hơn 0')
    .max(100, 'Giảm giá không được vượt quá 100')
    .optional(),
  description: Yup.string().nullable(),
  image: Yup.mixed<File | string>()
    .required('Bắt buộc phải có hình ảnh')
    .test('fileFormat', 'Chỉ chấp nhận file ảnh hoặc URL', (value) => {
      if (typeof value === 'string') {
        return true; // URL case
      }
      if (value instanceof File) {
        const supportedFormats = ['png', 'jpeg', 'jpg'];
        return supportedFormats.includes(value.name.split('.').pop()?.toLowerCase() as string);
      }
      return false;
    }),
  center_id: Yup.number().required('Vui lòng chọn trung tâm'),
  date_range: Yup.object({
    start_date: Yup.string().required('Bắt buộc phải có ngày bắt đầu'),
    end_date: Yup.string()
      .required('Bắt buộc phải có ngày kết thúc')
      .test('is-greater', 'End date should be after start date', function (value) {
        const { start_date } = this.parent;
        return start_date && value && new Date(value) > new Date(start_date);
      }),
  }).required(),
});

export { courseMentorEditAction };
