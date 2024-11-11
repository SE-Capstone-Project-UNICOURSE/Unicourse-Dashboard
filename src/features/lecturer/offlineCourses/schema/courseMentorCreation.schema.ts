import * as Yup from 'yup';

const courseMentorCreation = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  amount: Yup.number().positive().required('Amount is required'),
  discount: Yup.number().min(0).max(100).optional(),
  description: Yup.string().nullable(),
  image: Yup.string().url().max(555).required('Image URL is required'),
  center_id: Yup.number().required('Center ID is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string()
    .min(Yup.ref('start_date'), 'End date must be after start date')
    .required('End date is required'),
  mentor_sessions: Yup.array()
    .of(
      Yup.object().shape({
        // Define schema for each mentor session based on your requirements
      })
    )
    .required('Mentor sessions are required'),
  category: Yup.string().oneOf(['beginner', 'intermediate', 'advanced']).required(),
});

export { courseMentorCreation };
