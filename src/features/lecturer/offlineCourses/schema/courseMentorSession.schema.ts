import * as Yup from 'yup';

export const courseMentorSessionSchema = Yup.object().shape({
  title: Yup.string().required('Tiêu đề là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  date_range: Yup.object({
    start_date: Yup.string().required('Ngày bắt đầu là bắt buộc'),
    end_date: Yup.string()
      .required('Ngày kết thúc là bắt buộc')
      .test('is-greater', 'Ngày kết thúc phải sau ngày bắt đầu', function (value) {
        const { start_date } = this.parent;
        return start_date && value && new Date(value) > new Date(start_date);
      }),
  }).required('Khoảng thời gian là bắt buộc'),
  room_id: Yup.number()
    .typeError('Mã phòng phải là một số nguyên')
    .min(1, 'Vui lòng chọn mã phòng')
    .required('Mã phòng là bắt buộc'),
});
