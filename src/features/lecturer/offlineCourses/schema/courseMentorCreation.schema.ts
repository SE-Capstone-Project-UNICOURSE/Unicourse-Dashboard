import * as Yup from 'yup';

const courseMentorCreation = Yup.object().shape({
  title: Yup.string().required('Bắt buộc phải có tiêu đề'),
  amount: Yup.number().positive().required('Phải có giá cả'),
  discount: Yup.number()
    .min(0, 'Giảm giá không được nhỏ hơn 0')
    .max(100, 'Giảm giá không được vượt quá 100')
    .optional(),
  description: Yup.string().nullable(),
  image: Yup.string().url().max(555).required('Bắt buộc phải có hình ảnh'),
  center_id: Yup.number().required('Vui lòng chọn trung tâm'),
  date_range: Yup.object({
    start_date: Yup.string().required('Bắt buộc phải có ngày bắt đầu'),
    // .matches(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
    end_date: Yup.string()
      .required('Bắt buộc phải có ngày kết thúc')
      // .matches(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format')
      .test('is-greater', 'End date should be after start date', function (value) {
        const { start_date } = this.parent;
        return start_date && value && new Date(value) > new Date(start_date);
      }),
  }).required(),
});

export { courseMentorCreation };
