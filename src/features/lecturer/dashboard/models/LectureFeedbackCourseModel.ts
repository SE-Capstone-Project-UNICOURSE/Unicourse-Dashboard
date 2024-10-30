interface LectureFeedbackCourseModel {
  feedback_id: number; // Unique identifier for each feedback
  rating: number; // Rating given by the student (e.g., 1 to 5 stars)
  content: string; // Feedback content provided by the student
  created_at: string; // Timestamp for when the feedback was created
  course_id: number; // ID of the course related to the feedback
  course_title: string; // Title of the course related to the feedback
  student_id: number; // ID of the student who provided the feedback
}

interface LectureFeedbackCourseRequestModel {
  page: number;
  pageSize: number;
  order_by?: OrderBy;
}

interface OrderBy {
  [key: string]: 'asc' | 'desc';
}

export type { LectureFeedbackCourseRequestModel };

export default LectureFeedbackCourseModel;
