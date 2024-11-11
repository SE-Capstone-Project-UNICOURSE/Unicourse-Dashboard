import * as Yup from 'yup';

const courseMentorCreation = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  amount: Yup.number().positive().required('Amount is required'),
  discount: Yup.number().min(0).max(100).optional(),
  description: Yup.string().nullable(),
  image: Yup.string().url().max(555).required('Image URL is required'),
  center_id: Yup.number().required('Center ID is required'),
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
});

export { courseMentorCreation };
