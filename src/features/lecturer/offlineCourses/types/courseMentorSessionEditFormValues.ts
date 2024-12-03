export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface CourseMentorSessionEditFormValues {
  title: string;
  description: string;
  date_range: DateRange;
  room_id: number;
}

export const courseMentorSessionEditFormValues: CourseMentorSessionEditFormValues = {
  title: '',
  description: '',
  date_range: {
    start_date: '',
    end_date: '',
  },
  room_id: 0,
};
