interface courseMentorEditFormValuesTypes {
  title: string;
  amount: number;
  discount?: number;
  description?: string | null;
  image: File | string;
  center_id: number;
  date_range: {
    start_date: string;
    end_date: string;
  };
}

// Default values
const courseMentorEditFormValues: courseMentorEditFormValuesTypes = {
  title: '',
  amount: 0,
  discount: undefined,
  description: null,
  image: '',
  center_id: 0,
  date_range: {
    start_date: '',
    end_date: '',
  },
};

export { courseMentorEditFormValues };
export type { courseMentorEditFormValuesTypes };
