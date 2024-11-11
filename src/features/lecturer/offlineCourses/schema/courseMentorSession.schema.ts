import * as Yup from 'yup';

export const courseMentorSessionSchema = Yup.object().shape({
  title: Yup.string().required('Tiêu đề là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  date_range: Yup.object({
    start_date: Yup.string()
      .required('Start date is required')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
    end_date: Yup.string()
      .required('End date is required')
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format')
      .test('is-greater', 'End date should be after start date', function (value) {
        const { start_date } = this.parent;
        return start_date && value && new Date(value) > new Date(start_date);
      }),
  }).required(),
  room_id: Yup.number()
    .required('Mã phòng là bắt buộc')
    .typeError('Mã phòng phải là một số nguyên'),
});
